import { useMutation } from "react-query";
import { UseFormGetValues, UseFormSetError } from "react-hook-form";

import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import {
  CreateSessionMutation,
  CreateSessionMutationVariables,
} from "~/types/graphql";

import { gqlRequest } from "~/utils/helper/gql";

import { LoginFormDataType } from "./useLoginForm";
import CreateSessionOperation from "./CreateSession.gql";

const createSessionRequest = async (
  variable: () => CreateSessionMutationVariables
) => {
  try {
    return await gqlRequest<
      CreateSessionMutation,
      CreateSessionMutationVariables
    >(CreateSessionOperation, variable);
  } catch (error) {
    throw { message: "Something went wrong" };
  }
};

const errorMessage = {
  message: "email or password is invalid",
  shouldFocus: true,
};

const useCreateSessionMutation = (
  setError: UseFormSetError<LoginFormDataType>,
  getValue: UseFormGetValues<LoginFormDataType>
) => {
  const { dispatchNotification } = useNotificationContext();
  const { setAuthTrue } = useAuthContext();

  const errorNotification = () =>
    dispatchNotification({
      type: "add",
      status: "error",
      message: "Something went wrong",
    });

  const variable = (): CreateSessionMutationVariables => ({
    email: getValue("email"),
    password: getValue("password"),
  });

  return useMutation(() => createSessionRequest(variable), {
    mutationKey: "createUser",
    retry: 3,
    onError: () => errorNotification(),
    onSuccess: (data) => {
      if (!data) return errorNotification();

      const responseData = data.createSession;

      switch (responseData.__typename) {
        case "Token":
          setAuthTrue(responseData.token);
          dispatchNotification({
            type: "add",
            status: "success",
            message: "User login successful",
          });
          break;

        case "CreateSessionCredentialError":
          setError("email", errorMessage);
          setError("password", errorMessage);
          break;

        default:
          errorNotification();
      }
    },
  });
};

export default useCreateSessionMutation;
