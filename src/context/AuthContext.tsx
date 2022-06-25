import {
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

import { useQueryClient } from "react-query";

import { PropsWithChildrenOnlyType } from "~/types/nextMod";

type AuthContextType = null | {
  authToken: string;
  isAuth: boolean | null;
  setAuthTrue: (token: string) => void;
  setAuthFalse: () => void;
};

const AuthContext = createContext<AuthContextType>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw Error("Out of context");
  }
  return context;
};

const getLocalTokenValue = () => localStorage.getItem("token") || "";
const setLocalToken = (token: string) => localStorage.setItem("token", token);
const removeLocalToken = () => localStorage.removeItem("token");

export const AuthProvider: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [authToken, setAuthToken] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    setAuthToken(getLocalTokenValue());
  }, []);

  useEffect(() => {
    setIsAuth(!!authToken);
  }, [authToken]);

  useEffect(() => {
    if (!isAuth) queryClient.clear();
  }, [isAuth, queryClient]);

  useEffect(() => {
    window.onstorage = (event: StorageEvent) => {
      if (event.key !== "token") return;
      setAuthToken(() => event.newValue || "");
    };
  }, []);

  const setAuthTrue = (token: string) => {
    setLocalToken(token);
    setAuthToken(token);
    setIsAuth(true);
  };

  const setAuthFalse = () => {
    removeLocalToken();
    setAuthToken("");
    setIsAuth(false);
  };

  const authContextProviderValue = useMemo(
    () => ({ authToken, isAuth, setAuthTrue, setAuthFalse }),
    [isAuth, authToken]
  );

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};
