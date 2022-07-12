import { Dispatch, SetStateAction } from "react";

import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

import useDeleteAccountForm from "./useDeleteAccountForm";
import useDeleteUserMutation from "./useDeleteUserMutation";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteAccountModal = ({ isOpen, setIsOpen }: Props) => {
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useDeleteAccountForm();

  const { mutate, isLoading } = useDeleteUserMutation(getValues, setError);

  const onSubmit = () => {
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
