import { FC, useEffect, useState } from "react";

import { useAuthContext } from "~/context/AuthContext";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import { NotificationContextProvider } from "~/context/NotificationContext";

import Navbar from "~/pages/App/components/Navbar";

const AppLayout: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (isAuth !== null) setIsAppReady(true);
  }, [isAuth]);

  if (!isAppReady) return null;

  return (
    <NotificationContextProvider>
      <Navbar />
      {children}
    </NotificationContextProvider>
  );
};

export default AppLayout;
