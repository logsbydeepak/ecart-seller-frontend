import { useRouter } from "next/router";
import { FC, ReactElement, ReactNode } from "react";
import { useAuthContext } from "~/context/AuthContext";

interface Props {
  authShouldBe: boolean;
  redirectTo: string;
  page: ReactElement;
}

const AuthLayout: FC<Props> = ({ authShouldBe, redirectTo, page }) => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (isAuth !== authShouldBe) {
    router.push(redirectTo);
    return null;
  }

  return page;
};

export default AuthLayout;
