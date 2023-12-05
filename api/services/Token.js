import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Forbidden, Unauthorized } from "../utils/Errors.js";

dotenv.config();

class TokenService {
  static async generateAccessToken(payload) {
    return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
  }

  static async generateRefreshToken(payload) {
    return await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  }

  static async validateAccessToken(payload) {
    return await jwt.verify(payload, process.env.ACCESS_TOKEN_SECRET);
  }

  static async validateRefreshToken(payload) {
    return await jwt.verify(payload, process.env.REFRESH_TOKEN_SECRET);
  }

  static async checkAccess(req, _, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")?.[1];

    if (!token) {
      return next(new Unauthorized());
    }

    try {
      req.user = await TokenService.validateAccessToken(token);
      console.log(req.user);
    } catch (error) {
      console.log(error);
      return next(new Forbidden(error));
    }

    next();
  }
}

export default TokenService;
