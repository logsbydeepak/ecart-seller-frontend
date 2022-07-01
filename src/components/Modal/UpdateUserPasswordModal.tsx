import { object } from "yup";
import { Dispatch, FC, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

import { password } from "~/utils/validation";
import UpdateUserPasswordOperation from "~/utils/gql/User/UpdateUserPassword.gql";

import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import useAuthMutationHook from "~/hooks/useAuthMutationHook";

import {
  UpdateUserPasswordMutation,
  UpdateUserPasswordMutationVariables,
} from "~/types/graphql";

interface FormType {
  password: string;
  currentPassword: string;
}

const schema = object({
  password,
  currentPassword: password,
});

const useFormData = () =>
  useForm<FormType>({
    resolver: yupResolver(schema),
  });

const UpdateUserPasswordModal: FC<{
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

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const { mutate, isLoading } = useAuthMutationHook<
    UpdateUserPasswordMutation,
    UpdateUserPasswordMutationVariables
  >(
    "UpdateUserPasswordOperation",
    UpdateUserPasswordOperation,
    () => getValues(),
    {
      onSuccess: (data) => {
        if (!data) return errorNotification();

        const responseData = data.updateUserPassword;
        switch (responseData.__typename) {
          case "UpdateUserPasswordSuccessResponse":
            exitModal();
            break;

          case "TokenError":
            setAuthFalse();
            break;

          case "UpdateUserInvalidUserCredentialError":
            setError(
              "currentPassword",
              { message: "invalid password" },
              { shouldFocus: true }
            );
            break;

          default:
            errorNotification();
            break;
        }
      },
    }
  );

  const onSubmit: SubmitHandler<FormType> = async () => {
    mutate(getValues());
  };

  return (
    <ModalContainer
      title="Update password"
      isOpen={isOpen}
      exitModal={exitModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <PasswordInputWithLeftIcon
          register={register("password")}
          errorMessage={errors.password?.message}
          disabled={isLoading}
          className="mb-4 text-left"
          label="New Password"
          type="password"
          placeholder="********"
        />

        <PasswordInputWithLeftIcon
          register={register("currentPassword")}
          errorMessage={errors.currentPassword?.message}
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
            className=" mr-5 text-black hover:text-indigo-600"
            onClick={exitModal}
          />

          <SmallButton
            text="Save"
            type="submit"
            className="border-indigo-600 bg-indigo-600 text-white hover:border-indigo-700 hover:bg-indigo-700 disabled:border-black disabled:bg-black"
            isLoading={isLoading}
          />
        </fieldset>
      </form>
    </ModalContainer>
  );
};

export default UpdateUserPasswordModal;
