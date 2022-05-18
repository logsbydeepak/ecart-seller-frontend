import { FC } from "react";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";

interface ShowProps extends PropsWithChildrenOnlyType {
  when: boolean;
}

const Show: FC<ShowProps> = ({ when, children }) => {
  return <>{when && children}</>;
};

export default Show;
