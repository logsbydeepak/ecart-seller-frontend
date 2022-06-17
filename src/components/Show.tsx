import { FC, Fragment } from "react";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import { AnimatePresence } from "framer-motion";

interface ShowProps extends PropsWithChildrenOnlyType {
  when: boolean;
  isAnimation?: boolean;
}

const Show: FC<ShowProps> = ({ when, isAnimation, children }) => {
  if (isAnimation) return <AnimatePresence>{when && children}</AnimatePresence>;

  return <Fragment>{when && children}</Fragment>;
};

export default Show;
