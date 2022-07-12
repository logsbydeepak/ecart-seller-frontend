import { UseFormGetValues, UseFormSetError } from "react-hook-form";

import { useAuthContext } from "~/context/AuthContext";
import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import { useNotificationContext } from "~/context/NotificationContext";

import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from "~/types/graphql";

import DeleteUserOperation from "./DeleteUser.gql";
import { DeleteAccountModalFormDataType } from "./useDeleteAccountForm";

const useDeleteUserMutation = (
  getValues: UseFormGetValues<DeleteAccountModalFormDataType>,
  setError: UseFormSetError<DeleteAccountModalFormDataType>
) => {
  const { setAuthFalse } = useAuthContext();
  const { dispatchNotification } = useNotificationContext();

  const errorNotification = () =>
    dispatchNotification({
      type: "add",
      status: "error",
      message: "Something went wrong",
    });

  return useAuthMutationHook<DeleteUserMutation, DeleteUserMutationVariables>(
    "DeleteUserOperation",
    DeleteUserOperation,
    () => ({ currentPassword: getValues("password") }),
    {
      onError: () => errorNotification(),
      onSuccess: (data) => {
        if (!data) return errorNotification();
        const responseData = data.deleteUser;

        switch (responseData.__typename) {
          case "SuccessResponse":
            setAuthFalse();
            dispatchNotification({
              type: "add",
              status: "success",
              message: "User Logout from all device successfully",
            });
            break;

          case "DeleteUserCredentialError":
            setError(
              "password",
              { message: "invalid password" },
              { shouldFocus: true }
            );

            break;

          case "TokenError":
            setAuthFalse();
            break;

          default:
            errorNotification();
        }
      },
    }
  );
};

export default useDeleteUserMutation;
