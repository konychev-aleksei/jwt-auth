import express from "express";
import cors from "cors";
import Fingerprint from "express-fingerprint";
import AuthRootRouter from "./routers/Auth.js";
import TokenService from "./services/Token.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use(
  Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
  })
);

app.use("/auth", AuthRootRouter);

app.get("/resource/protected", TokenService.authenticateUser, (req, res) => {
  console.log(req.user);
  res.status(200).json(`Добро пожаловать, ${req.user.userName}! ${Date.now()}`);
});

app.listen(5000, () => {
  console.log("Сервер успешно запущен");
});
