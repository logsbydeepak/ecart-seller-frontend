import { Dispatch, SetStateAction } from "react";

import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

import useUpdateUserPasswordMutation from "./useUpdateUserPasswordMutation";
import useUpdateUserPasswordForm from "./useUpdateUserPasswordForm";

const UpdateUserPasswordModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useUpdateUserPasswordForm();

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  const { mutate, isLoading } = useUpdateUserPasswordMutation(
    getValues,
    setError,
    exitModal
  );

  const onSubmit = () => {
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
