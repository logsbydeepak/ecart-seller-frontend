import { object, InferType } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { password } from "~/utils/validation";

const validatorSchema = object({
  password,
});

export type DeleteAccountModalFormDataType = InferType<typeof validatorSchema>;

const useDeleteAccountForm = () => {
  return useForm<DeleteAccountModalFormDataType>({
    resolver: yupResolver(validatorSchema),
  });
};

export default useDeleteAccountForm;
