import * as yup from "yup";

export const email = yup.string().trim().lowercase().email().required();

export const password = yup
  .string()
  .trim()
  .required()
  .min(8)
  .matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$/,
    "password must container min 1 uppercase, lowercase, number, and symbol"
  );

export const name = yup.string().trim().required().min(3);
