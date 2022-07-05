import { object } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormDataType } from "./types";
import { firstName, lastName, password } from "~/utils/validation";

const validatorSchema = object({
  firstName,
  lastName,
  currentPassword: password,
});

const useFormData = (firstName: string, lastName: string) => {
  return useForm<FormDataType>({
    resolver: yupResolver(validatorSchema),
    defaultValues: { firstName, lastName, currentPassword: "" },
  });
};

export default useFormData;