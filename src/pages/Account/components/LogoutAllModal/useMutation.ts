import { UseFormGetValues, UseFormSetError } from "react-hook-form";

import { useAuthContext } from "~/context/AuthContext";
import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import { useNotificationContext } from "~/context/NotificationContext";
import {
  DeleteAllSessionMutation,
  DeleteAllSessionMutationVariables,
} from "~/types/graphql";

import { FormDataType } from "./types";
import DeleteAllSessionOperation from "./DeleteAllSession.gql";

const useMutation = (
  getValues: UseFormGetValues<FormDataType>,
  setError: UseFormSetError<FormDataType>
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

export default useMutation;
