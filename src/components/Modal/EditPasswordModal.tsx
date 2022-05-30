import { Dispatch, FC, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import ModalContainer from "./Atom/ModalContainer";
import PasswordInputWithLeftIcon from "../Input/PasswordInputWithLeftIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import { password } from "~/utils/validation";
import { object } from "yup";
import useAuthMutationRequestHook from "~/hooks/useAuthMutationRequest";
import SmallButton from "../Button/SmallButton";
import InputWithLeftIcon from "../Input/InputWithLeftIcon";
import EditPasswordQuery from "~/utils/gql/User/Edit/EditPassword.gql";
import { useQueryClient } from "react-query";
import { MailIcon } from "@heroicons/react/solid";

interface FormType {
  password: string;
  currentPassword: string;
}

const schema = object({
  password,
  currentPassword: password,
});

const EditPasswordModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const queryClient = useQueryClient();

  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });

  const onSuccessMutation = () => {
    queryClient.invalidateQueries("User info");
    exitModal();
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
  };

  const onSubmit: SubmitHandler<FormType> = async () => {
    mutateAsync();
  };

  const variable = () => ({
    toUpdate: "name",
    currentPassword: getValues("currentPassword"),
    password: getValues("password"),
  });

  const { mutateAsync, isLoading } = useAuthMutationRequestHook({
    query: EditPasswordQuery,
    name: "updateUser",
    ErrorResponse: [{ title: "BODY_PARSE", message: "invalid password" }],
    successTitle: "User",
    variable,
    onErrorMutation,
    onSuccessMutation,
  });

  return (
    <ModalContainer title="Edit Name" isOpen={isOpen} exitModal={exitModal}>
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

export default EditPasswordModal;
