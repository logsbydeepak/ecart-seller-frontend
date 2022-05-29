import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Dispatch, FC, SetStateAction } from "react";

import { useAuthContext } from "~/context/AuthContext";
import useAuthRequestHook from "~/hooks/useAuthRequestHook";
import DeleteSessionQuery from "~/utils/gql/Session/DeleteSession.gql";
import SmallButton from "../Button/SmallButton";
import ModalContainer from "./Atom/ModalContainer";

const LogoutModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { setIsAuth } = useAuthContext();

  const onSuccess = () => {
    setIsOpen(false);
    setIsAuth(false);
  };

  const onError = () => {
    setIsOpen(false);
  };

  const { refetch, isLoading } = useAuthRequestHook({
    key: "logout User",
    query: DeleteSessionQuery,
    name: "deleteSession",
    option: { enabled: false, onSuccess, onError },
  });

  const handleLogout = async () => {
    setIsOpen(true);
    await refetch();
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
