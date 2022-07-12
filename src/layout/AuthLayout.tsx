import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useAuthContext } from "~/context/AuthContext";

interface Props {
  isAuth: boolean;
  redirect: string;
  page: ReactElement;
}

const AuthLayout = ({ isAuth: pageIsAuth, redirect, page }: Props) => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (isAuth !== pageIsAuth) {
    router.push(redirect);
    return null;
  }

  return page;
};

export default AuthLayout;
