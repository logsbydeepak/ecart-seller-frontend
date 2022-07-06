import { object } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { password } from "~/utils/validation";

import { FormDataType } from "./types";

const validatorSchema = object({
  password,
});

const useFormData = () => {
  return useForm<FormDataType>({ resolver: yupResolver(validatorSchema) });
};

export default useFormData;
