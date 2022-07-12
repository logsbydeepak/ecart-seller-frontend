import { Dispatch, SetStateAction } from "react";

import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";

import useDeleteSessionMutation from "./useDeleteSessionMutation";

const LogoutModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { isLoading, mutate } = useDeleteSessionMutation();

  const handleLogout = async () => {
    setIsOpen(true);
    mutate();
  };

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  return (
    <ModalContainer title="Logout" isOpen={isOpen} exitModal={exitModal}>
      <p className="mb-4 max-w-md  text-neutral-600 ">
        Are you sure you want to logout? Click Logout Button to continue and
        Cancel Button to abort the process.
      </p>
      <fieldset disabled={isLoading} className="flex justify-center">
        <SmallButton
          text="Cancel"
          type="button"
          className="bg-red-white mr-5 text-black hover:text-indigo-600"
          onClick={exitModal}
        />

        <SmallButton
          text="Logout"
          type="submit"
          onClick={handleLogout}
          className="border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700 disabled:border-black disabled:bg-black"
          isLoading={isLoading}
        />
      </fieldset>
    </ModalContainer>
  );
};

export default LogoutModal;
