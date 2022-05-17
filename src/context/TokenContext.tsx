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

type TokenContextType =
  | string
  | {
      token: string;
      setToken: Dispatch<SetStateAction<string>>;
    };

const TokenContext = createContext<TokenContextType>("");

export const useTokenContext = () => {
  const context = useContext(TokenContext);

  if (context === null) {
    throw Error("Out of context");
  }
  return context;
};

export const TokenProvider: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const [token, setToken] = useState("");

  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (!isAuth) setToken("");
  }, [isAuth]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
