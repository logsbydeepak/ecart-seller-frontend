import { object, InferType, TypeOf } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { firstName, lastName, password } from "~/utils/validation";

const validatorSchema = object({
  password,
  currentPassword: password,
});

export type UpdateUserPasswordFormDataType = InferType<typeof validatorSchema>;

const useUpdateUserPasswordModalForm = () => {
  return useForm<UpdateUserPasswordFormDataType>({
    resolver: yupResolver(validatorSchema),
  });
};

export default useUpdateUserPasswordModalForm;
