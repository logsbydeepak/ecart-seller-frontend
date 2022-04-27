import { FC, useState } from "react";

import Navbar from "~/components/Navbar";
import { customUseLayoutEffect } from "~/utils/helper/nextMod";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import { useAuthContext } from "~/context/AuthContext";

const AppLayout: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const { isAuth } = useAuthContext();

  customUseLayoutEffect(() => {
    if (isAuth === null) return;
    setIsAppReady(true);
  }, [isAuth]);

  if (!isAppReady) return null;

  return (
    <>
      <Navbar auth={isAuth} />
      <div className="mx-auto max-w-screen-2xl px-20 pt-16">{children}</div>
    </>
  );
};

export default AppLayout;
