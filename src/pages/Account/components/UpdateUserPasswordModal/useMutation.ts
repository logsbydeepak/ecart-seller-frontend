import { UseFormGetValues, UseFormSetError } from "react-hook-form";

import { useAuthContext } from "~/context/AuthContext";
import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import { useNotificationContext } from "~/context/NotificationContext";

import {
  UpdateUserPasswordMutation,
  UpdateUserPasswordMutationVariables,
} from "~/types/graphql";

import { FormDataType } from "./types";
import UpdateUserPasswordOperation from "./UpdateUserPassword.gql";

const useMutation = (
  getValues: UseFormGetValues<FormDataType>,
  setError: UseFormSetError<FormDataType>,
  exitModal: () => void
) => {
  const { setAuthFalse } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const variable = (): UpdateUserPasswordMutationVariables => ({
    password: getValues("password"),
    currentPassword: getValues("currentPassword"),
  });

  return useAuthMutationHook<
    UpdateUserPasswordMutation,
    UpdateUserPasswordMutationVariables
  >("UpdateUserPasswordOperation", UpdateUserPasswordOperation, variable, {
    onError: () => errorNotification(),
    onSuccess: (data) => {
      if (!data) return errorNotification();

      const responseData = data.updateUserPassword;
      switch (responseData.__typename) {
        case "UpdateUserPasswordSuccessResponse":
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
