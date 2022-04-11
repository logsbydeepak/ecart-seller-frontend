import { useRouter } from "next/router";
import { useAuthContext } from "../utils/Context/AuthContext";

const SignUp = () => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (isAuth) {
    router.push("/");
    return <></>;
  }

  return (
    <>
      <h1>SignUp</h1>
    </>
  );
};

export default SignUp;
