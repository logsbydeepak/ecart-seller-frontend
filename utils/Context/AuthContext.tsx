import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { isatty } from "tty";
import { PropsWithChildrenOnlyType } from "../types";

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

const myUseLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const AuthProvider: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const [isAuth, changeIsAuth] = useState(false);

  const setIsAuth = (authValue: boolean) => {
    changeIsAuth(() => {
      localStorage.setItem("auth", authValue.toString());
      return authValue;
    });

    return authValue;
  };

  myUseLayoutEffect(() => {
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
