import { FC, ReactNode } from "react";

const SideBarContent: FC<{ title: string; children?: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <h1 className="text-2xl font-semibold">{title}</h1>
      {children}
    </>
  );
};

export default SideBarContent;
