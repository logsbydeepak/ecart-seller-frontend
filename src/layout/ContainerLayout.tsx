import { FC } from "react";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";

const ContainerLayout: FC<PropsWithChildrenOnlyType> = ({ children }) => (
  <div className="mx-auto max-w-screen-2xl px-6 pt-16">{children}</div>
);

export default ContainerLayout;
