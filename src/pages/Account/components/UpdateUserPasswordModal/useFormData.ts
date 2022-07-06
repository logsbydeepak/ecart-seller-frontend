import { object } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { firstName, lastName, password } from "~/utils/validation";
import { FormDataType } from "./types";

const validatorSchema = object({
  firstName,
  lastName,
  currentPassword: password,
});

const useUpdateUserPasswordModalForm = () => {
  return useForm<FormDataType>({
    resolver: yupResolver(validatorSchema),
  });
};

export default useUpdateUserPasswordModalForm;
