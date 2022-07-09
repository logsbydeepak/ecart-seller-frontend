import { Dispatch, FC, SetStateAction } from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";

import SimpleInput from "~/components/Input/SimpleInput";
import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

import useUpdateUserNameMutation from "./useUpdateUserNameMutation";
import useUpdateUserNameModalForm from "./useUpdateUserNameModalForm";

const UpdateUserNameModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  firstName: string;
  lastName: string;
}> = ({ isOpen, setIsOpen, firstName, lastName }) => {
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useUpdateUserNameModalForm(firstName, lastName);

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  const { mutate, isLoading } = useUpdateUserNameMutation(
    getValues,
    setError,
    exitModal
  );

  const onSubmit = () => {
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
