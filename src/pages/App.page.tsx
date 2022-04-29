import { NextPage } from "next";
import { useRouter } from "next/router";

import { useAuthContext } from "~/context/AuthContext";
import authPageGuard from "~/utils/helper/authPageGuard";

const App: NextPage = () => {
  authPageGuard(true, "/");

  return (
    <>
      <h1>App</h1>
    </>
  );
};

export default App;
