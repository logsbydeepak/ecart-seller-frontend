import { FC, useState } from "react";
import Navbar from "~/components/Navbar";

import { useAuthContext } from "~/context/AuthContext";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import { customUseLayoutEffect } from "~/utils/helper/nextMod";
import { NotificationContextProvider } from "~/context/NotificationContext";

const AppLayout: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const { authToken } = useAuthContext();

  customUseLayoutEffect(() => {
    if (!authToken) setIsAppReady(true);
  }, [authToken]);

  if (!isAppReady) return null;

  return (
    <NotificationContextProvider>
      <Navbar />
      {children}
    </NotificationContextProvider>
  );
};

export default AppLayout;
