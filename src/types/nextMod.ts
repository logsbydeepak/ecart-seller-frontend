import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageLayoutType = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
