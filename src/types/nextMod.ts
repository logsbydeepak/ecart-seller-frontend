import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export interface PropsWithChildrenOnlyType {
  children: ReactNode;
}

export type NextPageLayoutType = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
