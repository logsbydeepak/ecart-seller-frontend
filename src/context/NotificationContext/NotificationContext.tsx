import { v4 as uuidv4 } from "uuid";
import { createContext, Dispatch, PropsWithChildren, useContext } from "react";

import { AnimatePresence } from "framer-motion";
import Notification from "./components/Notification";
import { useImmerReducer } from "use-immer";
import notificationReducer, {
  NotificationActionType,
  notificationInitialState,
} from "./notificationReducer";

type NotificationContextType = null | {
  dispatchNotification: Dispatch<NotificationActionType>;
};

const NotificationContext = createContext<NotificationContextType>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw Error("Out of context");
  }
  return context;
};

export const NotificationContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [notificationState, dispatchNotification] = useImmerReducer(
    notificationReducer,
    notificationInitialState
  );

  return (
    <NotificationContext.Provider value={{ dispatchNotification }}>
      <div className="fixed bottom-0 right-0 z-30 flex flex-col justify-end">
        <AnimatePresence>
          {notificationState.map(({ type, message, id }) => (
            <Notification
              key={id}
              text={message}
              type={type}
              id={id}
              dispatchNotification={dispatchNotification}
            />
          ))}
        </AnimatePresence>
      </div>
      {children}
    </NotificationContext.Provider>
  );
};
