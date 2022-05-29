import { Dispatch, FC, SetStateAction } from "react";

import ModalContainer from "./Atom/ModalContainer";
import { useAuthContext } from "~/context/AuthContext";
import PasswordInputWithLeftIcon from "../Input/PasswordInputWithLeftIcon";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { password, firstName, lastName } from "~/utils/validation";
import { object } from "yup";
import LogoutAllSessionQuery from "~/utils/gql/Session/DeleteAllSession.gql";
import useAuthMutationRequestHook from "~/hooks/useAuthMutationRequest";
import SmallButton from "../Button/SmallButton";
import SimpleInput from "../Input/SimpleInput";
import InputWithLeftIcon from "../Input/InputWithLeftIcon";
import { EmojiHappyIcon } from "@heroicons/react/outline";

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

const EditNameModal: FC<{
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
      "currentPassword",
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
    variable: { currentPassword: getValues("currentPassword") },
    onErrorMutation,
    onSuccessMutation,
  });

  return (
    <ModalContainer title="Logout All" isOpen={isOpen} exitModal={exitModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <div className="mb-4 flex text-left">
          <InputWithLeftIcon
            label="First Name"
            disabled={false}
            register={register("firstName")}
            errorMessage={errors.firstName?.message}
            placeholder="first name"
            className="mr-4"
            Icon={<EmojiHappyIcon />}
          />

          <SimpleInput
            label="Last Name"
            disabled={false}
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

export default EditNameModal;
