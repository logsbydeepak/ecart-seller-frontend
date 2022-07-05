import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";
import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import {
  DeleteSessionMutation,
  DeleteSessionMutationVariables,
} from "~/types/graphql";
import DeleteSessionOperation from "./DeleteSession.gql";

const useDeleteSessionMutation = () => {
  const { addNotification } = useNotificationContext();
  const { setAuthFalse } = useAuthContext();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

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
          addNotification("success", "User Logout Successfully");
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
