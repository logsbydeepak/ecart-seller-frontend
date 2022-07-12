import { useQueryClient } from "react-query";

import { useAuthContext } from "~/context/AuthContext";
import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import { useNotificationContext } from "~/context/NotificationContext";

import {
  RemoveUserPictureMutation,
  RemoveUserPictureMutationVariables,
} from "~/types/graphql";

import RemoveUserPictureOperation from "./RemoveUserPicture.gql";

const useRemoveUserPictureMutation = (exitModal: () => void) => {
  const queryClient = useQueryClient();

  const { setAuthFalse } = useAuthContext();
  const { dispatchNotification } = useNotificationContext();

  const errorNotification = () =>
    dispatchNotification({
      type: "add",
      status: "error",
      message: "Something went wrong",
    });

  return useAuthMutationHook<
    RemoveUserPictureMutation,
    RemoveUserPictureMutationVariables
  >("RemoveUserPictureOperation", RemoveUserPictureOperation, () => ({}), {
    onSuccess: (data) => {
      if (!data) return errorNotification();

      const responseData = data.removeUserPicture;

      switch (responseData.__typename) {
        case "SuccessResponse":
          queryClient.invalidateQueries("ReadUserFirstNameAndPictureOperation");
          queryClient.invalidateQueries("ReadUserOperation");
          exitModal();
          break;

        case "TokenError":
          setAuthFalse();
          break;

        default:
          errorNotification();
          break;
      }
    },
  });
};

export default useRemoveUserPictureMutation;
