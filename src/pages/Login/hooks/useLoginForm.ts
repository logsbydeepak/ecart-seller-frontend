import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object } from "yup";
import { email, password } from "~/utils/validation";
import { CreateSessionFormDataType } from "~/pages/Login/types";

const formValidationSchema = object({
  email,
  password,
});

const useLoginForm = () => {
  return useForm<CreateSessionFormDataType>({
    resolver: yupResolver(formValidationSchema),
  });
};

export default useLoginForm;
