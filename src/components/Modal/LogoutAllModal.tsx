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
import SmallButton from "../Button/SmallButton";

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

  const {
    reset,
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: yupResolver(schema) });

  const onSuccessMutation = () => {
    setIsAuth(false);
  };

  const onErrorMutation = () => {
    setError(
      "password",
      { message: "invalid password" },
      { shouldFocus: true }
    );
  };

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<FormType> = async () => {
    mutateAsync();
  };

  const { mutateAsync, isLoading } = useAuthMutationRequestHook({
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

        <fieldset disabled={isLoading} className="flex justify-center">
          <SmallButton
            text="Cancel"
            type="button"
            className="bg-red-white mr-5 text-black hover:text-indigo-600"
            onClick={exitModal}
          />

          <SmallButton
            text="Logout All"
            type="submit"
            className="border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700 disabled:border-black disabled:bg-black"
            isLoading={isLoading}
          />
        </fieldset>
      </form>
    </ModalContainer>
  );
};

export default LogoutAllModal;
