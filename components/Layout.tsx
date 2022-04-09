import { ThemeProvider } from "next-themes";
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
          <div className="mx-auto my-0 mt-8 max-w-screen-2xl px-20 pt-14 font-poppins font-medium">
            {children}
          </div>
        </ThemeProvider>
      )}
    </>
  );
};

export default Layout;
