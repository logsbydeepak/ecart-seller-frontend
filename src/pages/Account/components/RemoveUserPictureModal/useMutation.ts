import { useQueryClient } from "react-query";

import { useAuthContext } from "~/context/AuthContext";
import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import { useNotificationContext } from "~/context/NotificationContext";

import {
  RemoveUserPictureMutation,
  RemoveUserPictureMutationVariables,
} from "~/types/graphql";

import RemoveUserPictureOperation from "./RemoveUserPicture.gql";

const useMutation = (exitModal: () => void) => {
  const queryClient = useQueryClient();

  const { setAuthFalse } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

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

export default useMutation;
