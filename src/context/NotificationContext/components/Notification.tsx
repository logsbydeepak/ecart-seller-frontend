import { motion } from "framer-motion";
import { Dispatch, useCallback, useEffect, useState } from "react";

import Show from "~/components/Show";
import { CloseButtonIcon, ErrorIcon, SuccessIcon } from "./NotificationIcon";
import { NotificationActionType } from "~/context/NotificationContext/notificationReducer";

const Notification = ({
  notification,
  dispatchNotification,
}: {
  notification: {
    message: string;
    type: "success" | "error";
    id: string;
  };
  dispatchNotification: Dispatch<NotificationActionType>;
}) => {
  const { id, message, type } = notification;
  const [timeFrame, setTimeFrame] = useState(0);

  const exitNotification = useCallback(() => {
    dispatchNotification({ type: "remove", id });
  }, [dispatchNotification, id]);

  useEffect(() => {
    const time = setTimeout(() => {
      if (timeFrame === 100) return;
      setTimeFrame(timeFrame + 0.5);
    }, 10);

    return () => clearTimeout(time);
  }, [timeFrame]);

  useEffect(() => {
    if (timeFrame === 100) {
      exitNotification();
    }
  }, [exitNotification, timeFrame]);

  return (
    <motion.div
      key={id}
      animate={{ x: 0 }}
      initial={{ x: 100 }}
      exit={{ x: 450 }}
    >
      <div className="mx-4 mb-4 w-96 rounded-lg border border-neutral-200 bg-white px-5 py-5 shadow-sm">
        <div className="mb-3 flex items-center">
          <Show when={type === "success"}>
            <SuccessIcon />
          </Show>

          <Show when={type === "success"}>
            <ErrorIcon />
          </Show>

          <p className="ml-2 text-sm">{message}</p>
          <CloseButtonIcon handleOnClick={exitNotification} />
        </div>
        <div
          className="h-1 rounded-full bg-neutral-500"
          style={{ width: `${timeFrame}%` }}
        ></div>
      </div>
    </motion.div>
  );
};

export default Notification;
