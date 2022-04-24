import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export interface PropsWithChildrenOnlyType {
  children: ReactNode;
}

export type NextPageLayoutType<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
