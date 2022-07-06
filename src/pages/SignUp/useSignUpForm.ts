import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, ref } from "yup";
import { email, firstName, lastName, password } from "~/utils/validation";
import { CreateUserFormDataType } from "~/pages/SignUp/type";

const formValidationSchema = object({
  firstName,
  lastName,
  email,
  password,
  confirmPassword: password.oneOf([ref("password")], "Password does not match"),
});

const useSignUpForm = () => {
  return useForm<CreateUserFormDataType>({
    resolver: yupResolver(formValidationSchema),
  });
};

export default useSignUpForm;
