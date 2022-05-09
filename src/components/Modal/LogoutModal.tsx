import { Dialog } from "@headlessui/react";
import { Dispatch, FC, SetStateAction } from "react";
import Spinner from "../Spinner";

const LogoutModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
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
        <Dialog.Title className="text-xl">Logging Out</Dialog.Title>
        <div className="mt-4 flex justify-center">
          <Spinner className="h-10 w-10 text-indigo-800" />
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default LogoutModal;
