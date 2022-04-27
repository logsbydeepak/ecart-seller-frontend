import { createContext, FC, useContext, useState } from "react";
import { customUseLayoutEffect } from "~/utils/helper/nextMod";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";

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

export const AuthProvider: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const [isAuth, changeIsAuth] = useState(false);

  const setIsAuth = (authValue: boolean) => {
    changeIsAuth(() => {
      localStorage.setItem("auth", authValue.toString());
      return authValue;
    });

    return authValue;
  };

  customUseLayoutEffect(() => {
    changeIsAuth(() => {
      return localStorage.getItem("auth") === "true";
    });
  }, [isAuth]);

  return (
    <>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
