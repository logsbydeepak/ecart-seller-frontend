import { Fragment, PropsWithChildren } from "react";
import { AnimatePresence } from "framer-motion";

interface Props extends PropsWithChildren {
  when: boolean;
  isAnimation?: boolean;
}

const Show = ({ when, isAnimation, children }: Props) => {
  if (isAnimation) return <AnimatePresence>{when && children}</AnimatePresence>;

  return <Fragment>{when && children}</Fragment>;
};

export default Show;
