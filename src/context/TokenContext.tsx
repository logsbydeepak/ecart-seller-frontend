import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import {
  createContext,
  FC,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { useAuthContext } from "./AuthContext";

type TokenContextType = null | {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

const TokenContext = createContext<TokenContextType>(null);

export const useTokenContext = () => {
  const context = useContext(TokenContext);

  if (context === null) {
    throw Error("Out of context");
  }
  return context;
};

const RefreshTime = 840000;

export const TokenProvider: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const [token, setToken] = useState("");

  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (!isAuth) setToken("");
  }, [isAuth]);

  useEffect(() => {
    if (!isAuth) return;
    const authRefreshToken = setTimeout(() => {
      setToken("");
    }, RefreshTime);

    return () => {
      clearTimeout(authRefreshToken);
    };
  }, [isAuth, token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
