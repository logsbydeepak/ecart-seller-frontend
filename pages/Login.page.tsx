import { NextPage } from "next";
import { useRouter } from "next/router";
import { isatty } from "tty";
import { useAuthContext } from "../utils/Context/AuthContext";

const Login: NextPage = () => {
  return (
    <>
      <h1>Login</h1>
    </>
  );
};

export default Login;
