import { UseFormGetValues, UseFormSetError } from "react-hook-form";

import { useAuthContext } from "~/context/AuthContext";
import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import { useNotificationContext } from "~/context/NotificationContext";

import {
  DeleteAllSessionMutation,
  DeleteAllSessionMutationVariables,
} from "~/types/graphql";

import { LogoutAllFormDataType } from "./useLogoutAllForm";
import DeleteAllSessionOperation from "./DeleteAllSession.gql";

const useDeleteAllSessionMutation = (
  getValues: UseFormGetValues<LogoutAllFormDataType>,
  setError: UseFormSetError<LogoutAllFormDataType>
) => {
  const { setAuthFalse } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  return useAuthMutationHook<
    DeleteAllSessionMutation,
    DeleteAllSessionMutationVariables
  >(
    "DeleteAllSessionOperation",
    DeleteAllSessionOperation,
    () => ({ currentPassword: getValues("password") }),
    {
      onError: () => errorNotification(),
      onSuccess: (data) => {
        if (!data) return errorNotification();
        const responseData = data.deleteAllSession;

        switch (responseData.__typename) {
          case "SuccessResponse":
            setAuthFalse();
            addNotification(
              "success",
              "User Logout from all device successfully"
            );
            break;

          case "DeleteAllSessionCredentialError":
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

export default useDeleteAllSessionMutation;
