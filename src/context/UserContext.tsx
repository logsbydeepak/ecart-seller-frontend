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

type UserContextType = null | {
  userInfo: { name: string; profile: string };
  setUserInfo: Dispatch<SetStateAction<{ name: string; profile: string }>>;
};

const UserContext = createContext<UserContextType>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw Error("Out of context");
  }
  return context;
};

const defaultData = {
  name: "User Name",
  profile:
    "https://images.unsplash.com/photo-1637633198300-08beaec68c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
};
export const UserProvider: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const [userInfo, setUserInfo] = useState(defaultData);
  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (!isAuth) setUserInfo(defaultData);
  }, [userInfo, isAuth]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
