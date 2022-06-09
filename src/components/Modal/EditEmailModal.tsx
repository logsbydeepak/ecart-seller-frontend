import { Dispatch, FC, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import ModalContainer from "./Atom/ModalContainer";
import PasswordInputWithLeftIcon from "../Input/PasswordInputWithLeftIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import { password, email } from "~/utils/validation";
import { object, ref } from "yup";
import useAuthMutationRequestHook from "~/hooks/useAuthMutationRequest";
import SmallButton from "../Button/SmallButton";
import InputWithLeftIcon from "../Input/InputWithLeftIcon";
import EditEmailQuery from "~/utils/gql/User/Update/UpdateEmail.gql";
import { useQueryClient } from "react-query";
import { MailIcon } from "@heroicons/react/solid";

interface FormType {
  email: string;
  currentPassword: string;
}

const schema = object({
  email: email.notOneOf([ref("email")], "value unchanged"),
  currentPassword: password,
});

const EditEmailModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  email: string;
}> = ({ isOpen, setIsOpen, email }) => {
  const queryClient = useQueryClient();

  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: { email, currentPassword: "" },
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
    email: getValues("email"),
  });

  const { mutateAsync, isLoading } = useAuthMutationRequestHook({
    query: EditEmailQuery,
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

export default EditEmailModal;
