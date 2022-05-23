import { Dialog } from "@headlessui/react";
import { Dispatch, FC, SetStateAction } from "react";
import Spinner from "../Spinner";

import DeleteSessionQuery from "~/utils/gql/Session/DeleteSession.gql";
import { useAuthContext } from "~/context/AuthContext";
import useAuthRequestHook from "~/hooks/useAuthRequestHook";
import ButtonWithTextAndSpinner from "../Button/ButtonWithTextAndSpinner";

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

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(true)}
      as="div"
      className="fixed top-0 z-50 flex h-full w-full items-center justify-center bg-neutral-900/60"
    >
      <Dialog.Panel
        as="div"
        className="rounded-lg bg-white p-8 text-center drop-shadow-xl"
      >
        <Dialog.Title className="text-xl">Log Out User</Dialog.Title>
        <div className="my-4 flex justify-center">
          {/* <Spinner className="h-10 w-10 text-indigo-800" /> */}
        </div>
        <button
          disabled={isLoading}
          className="mr-5 rounded-md border-2 border-slate-100 px-4 py-2 text-sm hover:text-indigo-600"
          onClick={() => setIsOpen(false)}
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
      </Dialog.Panel>
    </Dialog>
  );
};

export default LogoutModal;
