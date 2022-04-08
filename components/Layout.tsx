import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
import { useAuthContext } from "../utils/Context/AuthContext";
import Navbar from "./Navbar";

const Layout: FC = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (isAuth === null) return;
    setIsAppReady(true);
  }, [isAuth]);
  return (
    <>
      {isAppReady && (
        <ThemeProvider attribute="class" defaultTheme="system">
          <Navbar auth={isAuth} />
          {children}
        </ThemeProvider>
      )}
    </>
  );
};

export default Layout;
