import { UseFormGetValues, UseFormSetError } from "react-hook-form";
import { useMutation } from "react-query";
import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";
import {
  CreateSessionMutation,
  CreateSessionMutationVariables,
} from "~/types/graphql";
import { gqlRequest } from "~/utils/helper/gql";
import { CreateSessionFormDataType } from "../../types";
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
  setError: UseFormSetError<CreateSessionFormDataType>,
  getValue: UseFormGetValues<CreateSessionFormDataType>
) => {
  const { addNotification } = useNotificationContext();
  const { setAuthTrue } = useAuthContext();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

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
          addNotification("success", "User login successful");
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
