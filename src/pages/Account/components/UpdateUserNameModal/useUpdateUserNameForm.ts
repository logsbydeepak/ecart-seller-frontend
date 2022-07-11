import { object, InferType } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { firstName, lastName, password } from "~/utils/validation";

const validatorSchema = object({
  firstName,
  lastName,
  currentPassword: password,
});

export type UpdateUserNameModalFormDataType = InferType<typeof validatorSchema>;

const useUpdateUserNameModalForm = (firstName: string, lastName: string) => {
  return useForm<UpdateUserNameModalFormDataType>({
    resolver: yupResolver(validatorSchema),
    defaultValues: { firstName, lastName, currentPassword: "" },
  });
};

export default useUpdateUserNameModalForm;
