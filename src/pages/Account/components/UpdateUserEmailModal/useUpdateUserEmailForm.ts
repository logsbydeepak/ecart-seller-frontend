import { useForm } from "react-hook-form";
import { object, ref, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { email, password } from "~/utils/validation";

const validatorSchema = object({
  email: email.notOneOf([ref("email")], "value unchanged"),
  currentPassword: password,
});

export type UpdateUserEmailFormDataType = InferType<typeof validatorSchema>;

const useUpdateUserEmailForm = (email: string) => {
  return useForm<UpdateUserEmailFormDataType>({
    resolver: yupResolver(validatorSchema),
    defaultValues: { email },
  });
};

export default useUpdateUserEmailForm;
