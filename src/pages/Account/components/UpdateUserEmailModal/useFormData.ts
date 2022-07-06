import { object, ref } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { email, password } from "~/utils/validation";

import { FormDataType } from "./types";

const validatorSchema = object({
  email: email.notOneOf([ref("email")], "value unchanged"),
  currentPassword: password,
});

const useFormData = (email: string) => {
  return useForm<FormDataType>({
    resolver: yupResolver(validatorSchema),
    defaultValues: { email },
  });
};

export default useFormData;
