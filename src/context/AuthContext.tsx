import { useQueryClient } from "react-query";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import { customUseLayoutEffect } from "~/utils/helper/nextMod";
import { createContext, FC, useContext, useState, useEffect } from "react";

type AuthContextType = null | {
  authToken: string;
  setAuthToken: (authValue: string) => string;
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
const removeLocalToken = () => localStorage.removeItem("auth");

export const AuthProvider: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const queryClient = useQueryClient();
  const [authToken, setAuthToken] = useState("");

  customUseLayoutEffect(() => {
    setAuthToken(getLocalTokenValue());
  }, []);

  useEffect(() => {
    if (!authToken) queryClient.clear();
  }, [authToken, queryClient]);

  useEffect(() => {
    window.onstorage = (event: StorageEvent) => {
      if (event.key !== "token") return;
      const currentAuthToken = event.newValue || "";
      setAuthToken(() => {
        return currentAuthToken;
      });
    };
  }, []);

  const setAuthTokenLocalAndState = (token: string) => {
    setAuthToken(() => {
      token ? setLocalToken(token) : removeLocalToken();
      return token;
    });

    return token;
  };

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken: setAuthTokenLocalAndState }}
    >
      {children}
    </AuthContext.Provider>
  );
};
