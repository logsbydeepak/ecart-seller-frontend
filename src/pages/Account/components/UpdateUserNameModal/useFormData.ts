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

const useFormData = (firstName: string, lastName: string) => {
  return useForm<FormDataType>({
    resolver: yupResolver(validatorSchema),
    defaultValues: { firstName, lastName, currentPassword: "" },
  });
};

export default useFormData;
