import * as Yup from "yup";

export const signUpSchema = Yup.object({
  userName: Yup.string().required("Поле обязательно!"),
  password: Yup.string()
    .required("Поле обязательно!")
    .min(3, "Пароль слишком короткий - минимум 3 символа"),
});

export const signInSchema = Yup.object({
  userName: Yup.string().required("Поле обязательно!"),
  password: Yup.string().required("Поле обязательно!"),
});
