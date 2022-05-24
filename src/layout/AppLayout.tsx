import { FC, useState } from "react";
import Navbar from "~/components/Navbar";

import { useAuthContext } from "~/context/AuthContext";
import { SideBarProvider } from "~/context/SideBarContext";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import { customUseLayoutEffect } from "~/utils/helper/nextMod";
import TokenLayout from "./TokenLayout";

const AppLayout: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const { isAuth } = useAuthContext();

  customUseLayoutEffect(() => {
    if (isAuth !== null) setIsAppReady(true);
  }, [isAuth]);

  if (!isAppReady) return null;

  return (
    <TokenLayout>
      <SideBarProvider>
        <Navbar />
        {children}
      </SideBarProvider>
    </TokenLayout>
  );
};

export default AppLayout;
