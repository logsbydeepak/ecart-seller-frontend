import { Dispatch, FC, SetStateAction } from "react";

import ModalContainer from "./Atom/ModalContainer";
import { useAuthContext } from "~/context/AuthContext";
import PasswordInputWithLeftIcon from "../Input/PasswordInputWithLeftIcon";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { password } from "~/utils/validation";
import { object } from "yup";
import LogoutAllSessionQuery from "~/utils/gql/Session/DeleteAllSession.gql";
import useAuthMutationRequestHook from "~/hooks/useAuthMutationRequest";

interface FormType {
  password: string;
}

const schema = object({
  password: password,
});

const LogoutAllModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { setIsAuth } = useAuthContext();

  const onSuccessMutation = (data: any) => {
    setIsAuth(false);
  };

  const onErrorMutation = (data: any) => {
    setError(
      "password",
      { message: "invalid password" },
      { shouldFocus: true }
    );
  };

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  const onSubmit: SubmitHandler<FormType> = async () => {
    mutateAsync();
  };

  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: yupResolver(schema) });

  const { isLoading, mutateAsync } = useAuthMutationRequestHook({
    query: LogoutAllSessionQuery,
    name: "deleteAllSession",
    ErrorResponse: [{ title: "BODY_PARSE", message: "invalid password" }],
    successTitle: "SuccessResponse",
    variable: { currentPassword: getValues("password") },
    onErrorMutation,
    onSuccessMutation,
  });

  return (
    <ModalContainer title="Logout All" isOpen={isOpen} exitModal={exitModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <PasswordInputWithLeftIcon
          register={register("password")}
          errorMessage={errors.password?.message}
          disabled={isLoading}
          className="mb-6 text-left"
          label="Current Password"
          type="password"
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
      </form>
    </ModalContainer>
  );
};

export default LogoutAllModal;
