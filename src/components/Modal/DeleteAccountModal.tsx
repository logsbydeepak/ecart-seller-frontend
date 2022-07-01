import { Dispatch, FC, SetStateAction } from "react";

import ModalContainer from "./Atom/ModalContainer";
import { useAuthContext } from "~/context/AuthContext";
import PasswordInputWithLeftIcon from "../Input/PasswordInputWithLeftIcon";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { password } from "~/utils/validation";
import { object } from "yup";
import DeleteUserOperation from "~/utils/gql/User/DeleteUser.gql";
import useAuthMutationRequestHook from "~/hooks/useAuthMutationHook";
import SmallButton from "../Button/SmallButton";
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from "~/types/graphql";
import { useNotificationContext } from "~/context/NotificationContext";

interface FormType {
  password: string;
}

const schema = object({
  password: password,
});

const useFormData = () => useForm<FormType>({ resolver: yupResolver(schema) });

const DeleteAccountModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { setAuthFalse } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useFormData();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const { mutate, isLoading } = useAuthMutationRequestHook<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(
    "DeleteUserOperation",
    DeleteUserOperation,
    () => ({ currentPassword: getValues("password") }),
    {
      onError: () => errorNotification(),
      onSuccess: (data) => {
        if (!data) return errorNotification();
        const responseData = data.deleteUser;

        switch (responseData.__typename) {
          case "SuccessResponse":
            setAuthFalse();
            addNotification(
              "success",
              "User Logout from all device successfully"
            );
            break;

          case "DeleteUserCredentialError":
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

  const onSubmit: SubmitHandler<FormType> = async () => {
    mutate();
  };

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  return (
    <ModalContainer
      title="Delete Account"
      isOpen={isOpen}
      exitModal={exitModal}
    >
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
            text="Delete"
            type="submit"
            className="border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700 disabled:border-black disabled:bg-black"
            isLoading={isLoading}
          />
        </fieldset>
      </form>
    </ModalContainer>
  );
};

export default DeleteAccountModal;
