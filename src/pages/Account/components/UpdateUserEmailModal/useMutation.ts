import { UseFormGetValues, UseFormSetError } from "react-hook-form";
import { useQueryClient } from "react-query";

import { useAuthContext } from "~/context/AuthContext";
import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import { useNotificationContext } from "~/context/NotificationContext";

import {
  UpdateUserEmailMutation,
  UpdateUserEmailMutationVariables,
} from "~/types/graphql";

import UpdateUserEmailOperation from "./UpdateUserEmail.gql";
import { FormDataType } from "./types";

const useMutation = (
  getValues: UseFormGetValues<FormDataType>,
  setError: UseFormSetError<FormDataType>,
  exitModal: () => void
) => {
  const queryClient = useQueryClient();

  const { setAuthFalse } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const variable = (): UpdateUserEmailMutationVariables => ({
    email: getValues("email"),
    currentPassword: getValues("currentPassword"),
  });

  return useAuthMutationHook<
    UpdateUserEmailMutation,
    UpdateUserEmailMutationVariables
  >("UpdateUserEmailOperation", UpdateUserEmailOperation, () => getValues(), {
    onSuccess: (data) => {
      if (!data) return errorNotification();

      const responseData = data.updateUserEmail;
      switch (responseData.__typename) {
        case "UpdateUserEmailSuccessResponse":
          queryClient.invalidateQueries("ReadUserOperation");
          exitModal();
          break;

        case "TokenError":
          setAuthFalse();
          break;

        case "UserAlreadyExistError":
          setError(
            "email",
            { message: "email already exist" },
            { shouldFocus: true }
          );
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
