import AuthLayout from "./AuthLayout";
import { ReactElement, FC } from "react";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";

const AppNavbarLayout = (page: ReactElement) => (
  <AuthLayout
    isAuth={true}
    redirect="/Login"
    page={<AppNavigation>{page}</AppNavigation>}
  />
);

const AppNavigation: FC<PropsWithChildrenOnlyType> = () => {
  return (
    <>
      <h1>hi</h1>
    </>
  );
};

export default AppNavbarLayout;
