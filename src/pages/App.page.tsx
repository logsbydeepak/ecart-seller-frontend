import { NextPage } from "next";
import { useRouter } from "next/router";

import { useAuthContext } from "~/context/AuthContext";

const App: NextPage = () => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (!isAuth) {
    router.push("/Login");
    return null;
  }

  return (
    <>
      <h1>App</h1>
    </>
  );
};

export default App;
