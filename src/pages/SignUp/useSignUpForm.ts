import { useForm } from "react-hook-form";
import { object, ref, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { email, firstName, lastName, password } from "~/utils/validation";

const formValidationSchema = object({
  firstName,
  lastName,
  email,
  password,
  confirmPassword: password.oneOf([ref("password")], "Password does not match"),
});

export type SignUpFormDataType = InferType<typeof formValidationSchema>;

const useSignUpForm = () => {
  return useForm<SignUpFormDataType>({
    resolver: yupResolver(formValidationSchema),
  });
};

export default useSignUpForm;
