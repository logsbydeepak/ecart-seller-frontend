import { useQueryClient } from "react-query";

import { useAuthContext } from "~/context/AuthContext";
import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import { useNotificationContext } from "~/context/NotificationContext";

import {
  UpdateUserPictureMutation,
  UpdateUserPictureMutationVariables,
} from "~/types/graphql";

import UpdateUserPictureOperation from "./UpdateUserPicture.gql";

const useMutation = (
  handleImageCreation: () => string,
  exitModal: () => void
) => {
  const queryClient = useQueryClient();

  const { setAuthFalse } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");
  return useAuthMutationHook<
    UpdateUserPictureMutation,
    UpdateUserPictureMutationVariables
  >(
    "UpdateUserPictureOperation",
    UpdateUserPictureOperation,
    () => ({ file: handleImageCreation() }),
    {
      onError: () => errorNotification(),
      onSuccess: (data) => {
        if (!data) return errorNotification();

        const responseData = data.updateUserPicture;

        switch (responseData.__typename) {
          case "UpdateUserPictureSuccessResponse":
            queryClient.invalidateQueries(
              "ReadUserFirstNameAndPictureOperation"
            );
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
    }
  );
};

export default useMutation;
