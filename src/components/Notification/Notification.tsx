import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { ExclamationIcon } from "@heroicons/react/outline";
import { FC, useEffect, useState } from "react";

export const SuccessIconContainer: FC = () => (
  <div className="rounded-md bg-green-200 p-1.5">
    <CheckIcon className="h-5 w-5 text-green-800" />
  </div>
);

export const ErrorIconContainer: FC = () => (
  <div className="rounded-md bg-red-200 p-1.5">
    <ExclamationIcon className="h-5 w-5 text-red-800" />
  </div>
);

const Notification: FC<{
  text: string;
  type: "success" | "error";
  id: string;
  removeNotification: (id: string) => void;
}> = ({ text, type, id, removeNotification }) => {
  const [timeFrame, setTimeFrame] = useState(0);

  useEffect(() => {
    const time = setTimeout(() => {
      if (timeFrame === 100) return;
      setTimeFrame(timeFrame + 0.5);
    }, 10);

    return () => clearTimeout(time);
  }, [timeFrame]);

  useEffect(() => {
    if (timeFrame === 100) {
      removeNotification(id);
    }
  }, [timeFrame]);

  return (
    <div className="mb-3 w-96 rounded-lg border border-neutral-200 bg-white p-4 px-5 py-5 shadow-sm">
      <div className="mb-3 flex items-center">
        {type === "success" ? <SuccessIconContainer /> : <ErrorIconContainer />}
        <p className="ml-2 text-sm">{text}</p>
        <button
          className="ml-auto rounded-md  p-1.5 hover:bg-neutral-100"
          onClick={() => removeNotification(id)}
        >
          <XIcon className="h-5 w-5 text-neutral-500" />
        </button>
      </div>
      <div
        className="h-1 rounded-full bg-neutral-500"
        style={{ width: `${timeFrame}%` }}
      ></div>
    </div>
  );
};

export default Notification;
