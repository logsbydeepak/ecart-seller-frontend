import { useMutation } from "react-query";
import { UseFormGetValues, UseFormSetError } from "react-hook-form";

import { gqlRequest } from "~/utils/helper/gql";

import { useNotificationContext } from "~/context/NotificationContext";
import { useAuthContext } from "~/context/AuthContext";

import { CreateUserFormDataType } from "~/pages/SignUp/type";
import CreateUserOperation from "~/pages/SignUp/hooks/useCreateUserMutation/CreateUser.gql";

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
  setError: UseFormSetError<CreateUserFormDataType>,
  getValue: UseFormGetValues<CreateUserFormDataType>
) => {
  const { addNotification } = useNotificationContext();
  const { setAuthTrue } = useAuthContext();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

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
          addNotification("success", "User created successful");
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
