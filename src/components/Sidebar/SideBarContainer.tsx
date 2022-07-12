import { PropsWithChildren, ReactNode } from "react";

interface Props {
  content: ReactNode;
  children: ReactNode;
}

const SideBarContainer = ({ content, children }: PropsWithChildren<Props>) => {
  return (
    <div className="flex">
      <div className="mr-7 inline-block h-screen w-72 pt-20">{children}</div>
      <div className="mx-auto w-full max-w-screen-2xl px-8 py-24">
        {content}
      </div>
    </div>
  );
};

export default SideBarContainer;
