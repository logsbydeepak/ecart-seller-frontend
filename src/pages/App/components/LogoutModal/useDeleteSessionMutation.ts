import { useAuthContext } from "~/context/AuthContext";
import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import { useNotificationContext } from "~/context/NotificationContext";

import {
  DeleteSessionMutation,
  DeleteSessionMutationVariables,
} from "~/types/graphql";

import DeleteSessionOperation from "./DeleteSession.gql";

const useDeleteSessionMutation = () => {
  const { dispatchNotification } = useNotificationContext();
  const { setAuthFalse } = useAuthContext();

  const errorNotification = () =>
    dispatchNotification({
      type: "add",
      status: "error",
      message: "Something went wrong",
    });

  return useAuthMutationHook<
    DeleteSessionMutation,
    DeleteSessionMutationVariables
  >("DeleteSessionOperation", DeleteSessionOperation, () => ({}), {
    onError: () => errorNotification(),
    onSuccess: (data) => {
      if (!data) return errorNotification();
      const responseData = data.deleteSession;

      switch (responseData.__typename) {
        case "SuccessResponse":
          setAuthFalse();
          dispatchNotification("success", "User Logout Successfully");
          break;

        case "TokenError":
          setAuthFalse();
          break;

        default:
          errorNotification();
      }
    },
  });
};

export default useDeleteSessionMutation;
