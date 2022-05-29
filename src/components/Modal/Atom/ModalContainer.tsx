import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { FC, Fragment } from "react";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";

interface Props extends PropsWithChildrenOnlyType {
  title: string;
  isOpen: boolean;
  exitModal: () => void;
}

const ModalContainer: FC<Props> = ({ children, title, isOpen, exitModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={exitModal}
        as="div"
        className="fixed top-0 z-50 flex h-full w-full items-center justify-center bg-neutral-900/80"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel
            as="div"
            className="rounded-lg border border-neutral-400 bg-white text-center drop-shadow-xl"
          >
            <div className="flex justify-between  border-b border-neutral-200 p-6 pb-4">
              <p className="text-xl font-semibold">{title}</p>
              <button onClick={exitModal}>
                <XIcon className="h-5 w-5 text-neutral-900 hover:text-indigo-600" />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default ModalContainer;
