import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Dispatch, FC, SetStateAction } from "react";

import { useAuthContext } from "~/context/AuthContext";
import useAuthRequestHook from "~/hooks/useAuthRequestHook";
import DeleteSessionQuery from "~/utils/gql/Session/DeleteSession.gql";
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
      <p className="mb-4 max-w-md font-normal text-neutral-700">
        Are you sure you want to logout? Click Logout Button to continue and
        Cancel Button to abort the process.
      </p>
      <button
        disabled={isLoading}
        className="mr-5 rounded-md border-2 border-slate-100 px-4 py-2 text-sm hover:text-indigo-600"
        onClick={exitModal}
      >
        Cancel
      </button>
      <button
        disabled={isLoading}
        className="rounded-md border-2 border-red-600 bg-red-600 px-4 py-1.5 text-sm text-white hover:border-red-700 hover:bg-red-700"
        onClick={handleLogout}
      >
        Logout
      </button>
    </ModalContainer>
  );
};

export default LogoutModal;
