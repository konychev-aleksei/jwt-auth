import validateRequest from "../utils/ValidateRequest.js";
import * as Yup from "yup";

export const signInSchema = Yup.object({
  body: Yup.object({
    userName: Yup.string().required("Поле обязательно!"),
    password: Yup.string().required("Поле обязательно!"),
  }),
});

export const signUpSchema = Yup.object({
  body: Yup.object({
    userName: Yup.string().required("Поле обязательно!"),
    password: Yup.string()
      .required("Поле обязательно!")
      .min(3, "Пароль слишком короткий - минимум 3 символа"),
    role: Yup.number()
      .required("Поле обязательно!")
      .typeError("Значение должно быть числом!"),
  }),
});

export const refreshTokenRequiredSchema = Yup.object({
  cookies: Yup.object({
    refreshToken: Yup.string().required("Поле обязательно!"),
  }),
});

class AuthValidator {
  static async signIn(req, res, next) {
    return validateRequest(req, res, next, signInSchema);
  }

  static async signUp(req, res, next) {
    return validateRequest(req, res, next, signUpSchema);
  }

  static async logOut(req, res, next) {
    return validateRequest(req, res, next, refreshTokenRequiredSchema);
  }

  static async refresh(req, res, next) {
    return validateRequest(req, res, next, refreshTokenRequiredSchema);
  }
}

export default AuthValidator;
