import { object, InferType } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { password } from "~/utils/validation";

const validatorSchema = object({
  password,
});

export type LogoutAllFormDataType = InferType<typeof validatorSchema>;

const useFormData = () => {
  return useForm<LogoutAllFormDataType>({
    resolver: yupResolver(validatorSchema),
  });
};

export default useFormData;
