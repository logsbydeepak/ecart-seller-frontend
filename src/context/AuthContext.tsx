import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import { customUseLayoutEffect } from "~/utils/helper/nextMod";
import { createContext, FC, useContext, useState } from "react";

type AuthContextType = null | {
  isAuth: boolean;
  setIsAuth: (authValue: boolean) => boolean;
};

const AuthContext = createContext<AuthContextType>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw Error("Out of context");
  }
  return context;
};

const removeLocalAuth = () => localStorage.removeItem("auth");
const setLocalAuthToTrue = () => localStorage.setItem("auth", "1");
const getLocalAuthValue = () => localStorage.getItem("auth") === "1";

export const AuthProvider: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const setIsAuthLocalAndState = (authValue: boolean) => {
    setIsAuth(() => {
      authValue ? setLocalAuthToTrue() : removeLocalAuth();
      return authValue;
    });

    return authValue;
  };

  customUseLayoutEffect(() => {
    setIsAuth(getLocalAuthValue());

    window.addEventListener("storage", () => {
      const currentAuthValue = getLocalAuthValue();
      if (isAuth === currentAuthValue) return;
      setIsAuth(currentAuthValue);
    });
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth: setIsAuthLocalAndState }}>
      {children}
    </AuthContext.Provider>
  );
};
