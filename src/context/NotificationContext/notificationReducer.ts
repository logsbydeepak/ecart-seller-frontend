import { v4 as uuidv4 } from "uuid";

export const notificationInitialState: {
  id: string;
  message: string;
  type: "success" | "error";
}[] = [];

export type NotificationStateType = typeof notificationInitialState;

export type NotificationActionType =
  | {
      type: "add";
      status: "success" | "error";
      message: string;
    }
  | { type: "remove"; id: string };

const notificationReducer = (
  state: NotificationStateType,
  action: NotificationActionType
): NotificationStateType => {
  const id = uuidv4();
  switch (action.type) {
    case "add":
      state.push({
        id,
        message: action.message,
        type: action.status,
      });
      break;

    case "remove":
      state = state.filter((value) => value.id !== action.id);
      break;

    default:
      state;
      break;
  }

  return state;
};

export default notificationReducer;
