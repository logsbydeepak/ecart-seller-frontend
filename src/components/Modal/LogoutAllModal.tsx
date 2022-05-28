import { Dispatch, FC, SetStateAction } from "react";

import ModalContainer from "./Atom/ModalContainer";
import { useAuthContext } from "~/context/AuthContext";
import PasswordInputWithLeftIcon from "../Input/PasswordInputWithLeftIcon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { password } from "~/utils/validation";
import { object } from "yup";
import LogoutAllSessionQuery from "~/utils/gql/Session/DeleteAllSession.gql";
import useAuthMutationRequestHook from "~/hooks/useAuthMutationRequest";
import { useFormik } from "formik";

interface FormType {
  password: string;
}

const initialValues = {
  password: "",
};

const validationSchema = object({
  password: password,
});

const LogoutAllModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { setIsAuth } = useAuthContext();

  const onSuccessMutation = (data: any) => {
    console.log(data);
    setIsAuth(false);
  };

  const onErrorMutation = (data: any) => {
    console.log(data);
    setErrors({
      password: "invalid password",
    });
  };

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  const onSubmit = () => {
    mutateAsync();
  };

  const { errors, handleSubmit, touched, getFieldProps, setErrors, values } =
    useFormik<FormType>({
      initialValues,
      validationSchema,
      onSubmit,
    });

  const { isLoading, mutateAsync } = useAuthMutationRequestHook({
    query: LogoutAllSessionQuery,
    name: "deleteAllSession",
    ErrorResponse: [{ title: "BODY_PARSE", message: "invalid password" }],
    successTitle: "SuccessResponse",
    variable: { currentPassword: values.password },
    onErrorMutation,
    onSuccessMutation,
  });

  const errorMessage = (key: keyof FormType) =>
    errors[key] && touched[key] && errors[key];
  return (
    <ModalContainer title="Logout All" isOpen={isOpen} exitModal={exitModal}>
      <form onSubmit={handleSubmit} className="w-96">
        <fieldset disabled={isLoading}>
          <PasswordInputWithLeftIcon
            getFieldProps={getFieldProps("password")}
            className="mb-6 text-left"
            label="Current Password"
            type="password"
            errorMessage={errorMessage("password")}
            placeholder="********"
          />

          <button
            className="mr-5 rounded-md border-2 border-slate-100 px-4 py-2 text-sm hover:text-indigo-600"
            type="button"
            onClick={exitModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md border-2 border-red-600 bg-red-600 px-4 py-1.5 text-sm text-white hover:border-red-700 hover:bg-red-700"
          >
            Logout
          </button>
        </fieldset>
      </form>
    </ModalContainer>
  );
};

export default LogoutAllModal;
