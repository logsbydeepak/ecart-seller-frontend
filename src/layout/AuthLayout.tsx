import { useRouter } from "next/router";
import { FC, ReactElement } from "react";
import { useAuthContext } from "~/context/AuthContext";

interface Props {
  isAuth: boolean;
  redirect: string;
  page: ReactElement;
}

const AuthLayout: FC<Props> = ({ isAuth, redirect, page }) => {
  const { authToken } = useAuthContext();
  const router = useRouter();

  if (!!authToken !== isAuth) {
    router.push(redirect);
    return null;
  }

  return page;
};

export default AuthLayout;
