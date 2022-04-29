import { useAuthContext } from "~/context/AuthContext";
import { useRouter } from "next/router";

const authPageGuard = (authShouldBe: boolean, elseSendToUrl: string) => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (isAuth !== authShouldBe) {
    router.push(elseSendToUrl);
    return null;
  }
};

export default authPageGuard;
