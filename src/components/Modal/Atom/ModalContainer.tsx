import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { AnimationProps, motion } from "framer-motion";

import Show from "~/components/Show";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";

interface Props extends PropsWithChildrenOnlyType {
  title: string;
  isOpen: boolean;
  exitModal: () => void;
}

const animation: AnimationProps = {
  transition: { duration: 0.2 },
  initial: { y: 500, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 500, opacity: 0 },
};

const ModalContainer: FC<Props> = ({ children, title, isOpen, exitModal }) => {
  return (
    <Dialog static open={isOpen} onClose={exitModal} className="relative z-10">
      <div className="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity" />
      <motion.div {...animation} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel
            as="div"
            className="z-30 rounded-lg border border-neutral-400 bg-white text-center drop-shadow-xl "
          >
            <div className="flex justify-between  border-b border-neutral-200 p-6 pb-4">
              <p className="text-xl font-semibold">{title}</p>
              <button onClick={exitModal} type="button">
                <XIcon className="h-5 w-5 text-neutral-900 hover:text-indigo-600" />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </Dialog.Panel>
        </div>
      </motion.div>
    </Dialog>
  );
};

export default ModalContainer;
