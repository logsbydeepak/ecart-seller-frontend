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

type SideBarContextType = null | {
  sideBarIsOpen: boolean;
  setSideBarIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SideBarContext = createContext<SideBarContextType>(null);

export const useSideBarContext = () => {
  const context = useContext(SideBarContext);

  if (context === null) {
    throw Error("Out of context");
  }
  return context;
};

export const SideBarProvider: FC<PropsWithChildrenOnlyType> = ({
  children,
}) => {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(true);
  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (!isAuth) setSideBarIsOpen(true);
  }, [isAuth]);

  return (
    <SideBarContext.Provider value={{ sideBarIsOpen, setSideBarIsOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};
