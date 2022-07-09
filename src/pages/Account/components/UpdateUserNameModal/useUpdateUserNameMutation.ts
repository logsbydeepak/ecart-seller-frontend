import { useAuthContext } from "~/context/AuthContext";
import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import { UseFormGetValues, UseFormSetError } from "react-hook-form";
import { useNotificationContext } from "~/context/NotificationContext";

import {
  UpdateUserNameMutation,
  UpdateUserNameMutationVariables,
} from "~/types/graphql";

import { UpdateUserNameModalFormDataType } from "./useUpdateUserNameModalForm";
import UpdateUserNameOperation from "./UpdateUserName.gql";
import { useQueryClient } from "react-query";

const useMutation = (
  getValues: UseFormGetValues<UpdateUserNameModalFormDataType>,
  setError: UseFormSetError<UpdateUserNameModalFormDataType>,
  exitModal: () => void
) => {
  const queryClient = useQueryClient();
  const { setAuthFalse } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const variable = (): UpdateUserNameMutationVariables => ({
    firstName: getValues("firstName"),
    lastName: getValues("lastName"),
    currentPassword: getValues("currentPassword"),
  });

  return useAuthMutationHook<
    UpdateUserNameMutation,
    UpdateUserNameMutationVariables
  >("UpdateUserNameOperation", UpdateUserNameOperation, variable, {
    onError: () => errorNotification(),
    onSuccess: (data) => {
      if (!data) return errorNotification();

      const responseData = data.updateUserName;
      switch (responseData.__typename) {
        case "UpdateUserNameSuccessResponse":
          queryClient.invalidateQueries("ReadUserFirstNameAndPictureOperation");
          queryClient.invalidateQueries("ReadUserOperation");
          exitModal();
          break;

        case "TokenError":
          setAuthFalse();
          break;

        case "UpdateUserInvalidUserCredentialError":
          setError(
            "currentPassword",
            { message: "invalid password" },
            { shouldFocus: true }
          );
          break;

        default:
          errorNotification();
          break;
      }
    },
  });
};

export default useMutation;
