import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthContext } from "../utils/Context/AuthContext";

const Login: NextPage = () => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (isAuth) {
    router.push("/");
    return <></>;
  }

  return (
    <>
      <h1>Login</h1>
    </>
  );
};

export default Login;
