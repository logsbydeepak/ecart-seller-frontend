import { FC, ReactNode, useEffect } from "react";
import { classNames } from "~/utils/helper/tailwind";

import { useSideBarContext } from "~/context/SideBarContext";

interface Props {
  content: ReactNode;
  children: ReactNode;
}

const SideBarContainer: FC<Props> = ({ content, children }) => {
  const { sideBarIsOpen, setSideBarIsOpen } = useSideBarContext();

  useEffect(() => {
    setSideBarIsOpen(true);
  }, [setSideBarIsOpen]);

  return (
    <div className="flex">
      <div
        className={classNames(
          sideBarIsOpen ? "inline-block" : "hidden",
          "mr-8 h-screen w-72 pt-20"
        )}
      >
        {children}
      </div>
      <div className="mx-auto w-full max-w-screen-2xl px-8 py-20">
        {content}
      </div>
    </div>
  );
};

export default SideBarContainer;
