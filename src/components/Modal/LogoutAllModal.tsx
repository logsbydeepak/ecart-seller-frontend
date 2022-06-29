import { object } from "yup";
import { Dispatch, FC, SetStateAction } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import { password } from "~/utils/validation";
import DeleteAllSessionOperation from "~/utils/gql/Session/DeleteAllSession.gql";

import {
  DeleteAllSessionMutation,
  DeleteAllSessionMutationVariables,
} from "~/types/graphql";

import useAuthMutationHook from "~/hooks/useAuthMutationHook";

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
  const { setAuthFalse, setAuthTrue, authToken } = useAuthContext();

  const { addNotification } = useNotificationContext();

  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: yupResolver(schema) });

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const { mutate, isLoading } = useAuthMutationHook<
    DeleteAllSessionMutation,
    DeleteAllSessionMutationVariables
  >(
    "DeleteAllSessionOperation",
    DeleteAllSessionOperation,
    { currentPassword: getValues("password") },
    {
      onError: () => errorNotification(),
      onSuccess: (data) => {
        if (!data) return errorNotification();
        const responseData = data.deleteAllSession;

        switch (responseData.__typename) {
          case "SuccessResponse":
            setAuthFalse();
            addNotification(
              "success",
              "User Logout from all device successfully"
            );
            break;

          case "DeleteAllSessionCredentialError":
            setError(
              "password",
              { message: "invalid password" },
              { shouldFocus: true }
            );

            break;

          case "TokenError":
            setAuthFalse();
            break;

          default:
            errorNotification();
        }
      },
    }
  );

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  const onSubmit: SubmitHandler<FormType> = () => {
    mutate();
  };

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
