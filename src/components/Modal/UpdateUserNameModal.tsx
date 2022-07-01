import { object } from "yup";
import { useQueryClient } from "react-query";
import { Dispatch, FC, SetStateAction } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { EmojiHappyIcon } from "@heroicons/react/outline";

import SimpleInput from "~/components/Input/SimpleInput";
import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

import { password, firstName, lastName } from "~/utils/validation";
import UpdateUserNameOperation from "~/utils/gql/User/UpdateUserName.gql";

import { useNotificationContext } from "~/context/NotificationContext";
import { useAuthContext } from "~/context/AuthContext";

import useAuthMutationHook from "~/hooks/useAuthMutationHook";

import {
  UpdateUserNameMutation,
  UpdateUserNameMutationVariables,
} from "~/types/graphql";
import Show from "../Show";

interface FormType {
  firstName: string;
  lastName: string;
  currentPassword: string;
}

const schema = object({
  firstName,
  lastName,
  currentPassword: password,
});

const useFormData = (firstName: string, lastName: string) =>
  useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: { firstName, lastName, currentPassword: "" },
  });

const UpdateUserNameModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  firstName: string;
  lastName: string;
}> = ({ isOpen, setIsOpen, firstName, lastName }) => {
  const queryClient = useQueryClient();

  const { setAuthFalse } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useFormData(firstName, lastName);

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const { mutate, isLoading } = useAuthMutationHook<
    UpdateUserNameMutation,
    UpdateUserNameMutationVariables
  >("UpdateUserNameOperation", UpdateUserNameOperation, () => getValues(), {
    onError: () => errorNotification(),
    onSuccess: (data) => {
      if (!data) return errorNotification();

      const responseData = data.updateUserName;
      switch (responseData.__typename) {
        case "UpdateUserNameSuccessResponse":
          queryClient.invalidateQueries("ReadUserFirstNameAndPictureOperation");
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
    <ModalContainer title="Update name" isOpen={isOpen} exitModal={exitModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <div className="mb-4 flex text-left">
          <InputWithLeftIcon
            label="First Name"
            register={register("firstName")}
            disabled={isLoading}
            errorMessage={errors.firstName?.message}
            placeholder="first name"
            className="mr-4"
            Icon={<EmojiHappyIcon />}
          />

          <SimpleInput
            label="Last Name"
            disabled={isLoading}
            register={register("lastName")}
            errorMessage={errors.lastName?.message}
            placeholder="last name"
          />
        </div>

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

export default UpdateUserNameModal;
