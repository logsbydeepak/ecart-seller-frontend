import { useRouter } from "next/router";
import { FC, ReactElement } from "react";
import { useAuthContext } from "~/context/AuthContext";

interface Props {
  isAuth: boolean;
  redirect: string;
  page: ReactElement;
}

const AuthLayout: FC<Props> = ({ isAuth: pageIsAuth, redirect, page }) => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (isAuth !== pageIsAuth) {
    router.push(redirect);
    return null;
  }

  return page;
};

export default AuthLayout;
