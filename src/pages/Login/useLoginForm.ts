import { object, InferType } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { email, password } from "~/utils/validation";

const formValidationSchema = object({
  email,
  password,
});

export type LoginFormDataType = InferType<typeof formValidationSchema>;

const useLoginForm = () => {
  return useForm<LoginFormDataType>({
    resolver: yupResolver(formValidationSchema),
  });
};

export default useLoginForm;
