import { object, ref } from "yup";
import { useQueryClient } from "react-query";
import { MailIcon } from "@heroicons/react/solid";
import { Dispatch, FC, SetStateAction } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

import { password, email } from "~/utils/validation";
import UpdateUserEmailOperation from "~/utils/gql/User/UpdateUserEmail.gql";

import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import useAuthMutationHook from "~/hooks/useAuthMutationHook";

import {
  UpdateUserEmailMutation,
  UpdateUserEmailMutationVariables,
} from "~/types/graphql";

interface FormType {
  email: string;
  currentPassword: string;
}

const schema = object({
  email: email.notOneOf([ref("email")], "value unchanged"),
  currentPassword: password,
});

const useFormData = (email: string) =>
  useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: { email },
  });

const UpdateUserEmailModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  email: string;
}> = ({ isOpen, setIsOpen, email }) => {
  const queryClient = useQueryClient();

  const { setAuthFalse } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useFormData(email);

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const { mutate, isLoading } = useAuthMutationHook<
    UpdateUserEmailMutation,
    UpdateUserEmailMutationVariables
  >("UpdateUserEmailOperation", UpdateUserEmailOperation, getValues(), {
    onSuccess: (data) => {
      if (!data) return errorNotification();

      const responseData = data.updateUserEmail;
      switch (responseData.__typename) {
        case "UpdateUserEmailSuccessResponse":
          queryClient.invalidateQueries("ReadUserOperation");
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
  });

  const onSubmit: SubmitHandler<FormType> = async () => {
    mutate();
  };

  return (
    <ModalContainer title="Edit Name" isOpen={isOpen} exitModal={exitModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <InputWithLeftIcon
          disabled={isLoading}
          register={register("email")}
          label="Email"
          errorMessage={errors.email?.message}
          className="mb-4 text-left"
          placeholder="example@abc.com"
          Icon={<MailIcon />}
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

export default UpdateUserEmailModal;
