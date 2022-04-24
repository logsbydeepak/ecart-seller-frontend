import { FC, useState } from "react";

import Navbar from "~/components/Navbar";
import { customUseLayoutEffect } from "~/utils/hooks";
import { PropsWithChildrenOnlyType } from "~/utils/types";
import { useAuthContext } from "~/utils/Context/AuthContext";

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
