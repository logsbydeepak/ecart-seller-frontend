import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";

interface Props extends PropsWithChildrenOnlyType {
  title: string;
  isOpen: boolean;
  exitModal: () => void;
}

const id = uuidv4();

const ModalContainer: FC<Props> = ({ children, title, isOpen, exitModal }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={exitModal}
          as="div"
          className="fixed top-0 z-50 flex h-full w-full items-center justify-center bg-neutral-900/80"
        >
          <Dialog.Panel
            as={motion.div}
            key={id}
            transition={{ duration: 0.2 }}
            initial={{ y: 500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 500, opacity: 0 }}
            className="rounded-lg border border-neutral-400 bg-white text-center drop-shadow-xl"
          >
            <div className="flex justify-between  border-b border-neutral-200 p-6 pb-4">
              <p className="text-xl font-semibold">{title}</p>
              <button onClick={exitModal} type="button">
                <XIcon className="h-5 w-5 text-neutral-900 hover:text-indigo-600" />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ModalContainer;
