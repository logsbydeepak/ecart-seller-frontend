import { ThemeProvider } from "next-themes";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useAuthContext } from "../utils/Context/AuthContext";
import { customUseLayoutEffect } from "../utils/hooks";
import { PropsWithChildrenOnlyType } from "../utils/types";
import Navbar from "./Navbar";

const Layout: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const { isAuth } = useAuthContext();

  customUseLayoutEffect(() => {
    if (isAuth === null) return;
    setIsAppReady(true);
  }, [isAuth]);

  if (!isAppReady) {
    return null;
  }

  return (
    <>
      <Navbar auth={isAuth} />
      <div className="mx-auto my-0 max-w-screen-2xl px-20 pt-20">
        {children}
      </div>
    </>
  );
};

export default Layout;
