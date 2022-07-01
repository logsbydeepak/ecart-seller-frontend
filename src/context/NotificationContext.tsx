import { createContext, FC, useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import Notification from "~/components/Notification/Notification";
import { AnimatePresence } from "framer-motion";

type NotificationContextType = null | {
  addNotification: (type: "success" | "error", text: string) => void;
};

const NotificationContext = createContext<NotificationContextType>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw Error("Out of context");
  }
  return context;
};

export const NotificationContextProvider: FC<PropsWithChildrenOnlyType> = ({
  children,
}) => {
  const [notification, setNotification] = useState<
    { type: "success" | "error"; text: string; id: string }[]
  >([]);

  const removeNotification = (id: string) => {
    setNotification((prevNotification) => {
      return prevNotification.filter((value) => value.id !== id);
    });
  };

  const addNotification = (type: "success" | "error", text: string) => {
    setNotification((prev) => [...prev, { text, type, id: uuidv4() }]);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      <div className="fixed bottom-0 right-0 z-30 flex flex-col justify-end">
        <AnimatePresence>
          {notification.map(({ type, text, id }) => (
            <Notification
              type={type}
              text={text}
              id={id}
              key={id}
              removeNotification={removeNotification}
            />
          ))}
        </AnimatePresence>
      </div>
      {children}
    </NotificationContext.Provider>
  );
};
