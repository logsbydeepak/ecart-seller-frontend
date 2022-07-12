import { useMutation } from "react-query";
import { UseFormGetValues, UseFormSetError } from "react-hook-form";

import { gqlRequest } from "~/utils/helper/gql";
import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import CreateUserOperation from "./CreateUser.gql";
import { SignUpFormDataType } from "./useSignUpForm";

import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from "~/types/graphql";

const createUserRequest = async (
  variable: () => CreateUserMutationVariables
) => {
  try {
    return await gqlRequest<CreateUserMutation, CreateUserMutationVariables>(
      CreateUserOperation,
      variable
    );
  } catch (error) {
    throw { message: "Something went wrong" };
  }
};

const useCreateUserMutation = (
  setError: UseFormSetError<SignUpFormDataType>,
  getValue: UseFormGetValues<SignUpFormDataType>
) => {
  const { dispatchNotification } = useNotificationContext();
  const { setAuthTrue } = useAuthContext();

  const errorNotification = () =>
    dispatchNotification({
      type: "add",
      status: "error",
      message: "Something went wrong",
    });

  const variable = (): CreateUserMutationVariables => ({
    firstName: getValue("firstName"),
    lastName: getValue("lastName"),
    email: getValue("email"),
    password: getValue("password"),
  });

  return useMutation(() => createUserRequest(variable), {
    mutationKey: "createUser",
    retry: 3,
    onError: () => errorNotification(),
    onSuccess: (data) => {
      if (!data) return errorNotification();

      const responseData = data.createUser;
      switch (responseData.__typename) {
        case "Token":
          setAuthTrue(responseData.token);
          dispatchNotification({
            type: "add",
            status: "success",
            message: "User created successful",
          });
          break;

        case "UserAlreadyExistError":
          setError(
            "email",
            { message: "email already exist" },
            { shouldFocus: true }
          );
          break;

        default:
          errorNotification();
      }
    },
  });
};

export default useCreateUserMutation;
