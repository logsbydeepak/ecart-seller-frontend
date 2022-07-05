import { MailIcon } from "@heroicons/react/solid";
import { Dispatch, FC, SetStateAction } from "react";

import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

import useFormData from "./useFormData";
import useMutationUpdateUserEmail from "./useMutationUpdateUserEmail";

interface FormType {
  email: string;
  currentPassword: string;
}


const UpdateUserEmailModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  email: string;
}> = ({ isOpen, setIsOpen, email }) => {

  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useFormData(email)

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };


  const { mutate, isLoading } = useMutationUpdateUserEmail(getValues, setError, exitModal)

  const onSubmit  = () => {
    mutate();
  };

  return (
    <ModalContainer title="Update email" isOpen={isOpen} exitModal={exitModal}>
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
