import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export interface PropsWithChildrenOnlyType {
  children: ReactNode;
}

export type NestPageLayoutType<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactElement;
};
