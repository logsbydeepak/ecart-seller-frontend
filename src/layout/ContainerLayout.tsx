import { PropsWithChildren } from "react";

const ContainerLayout = ({ children }: PropsWithChildren) => (
  <div className="mx-auto max-w-screen-2xl px-6 pt-16">{children}</div>
);

export default ContainerLayout;
