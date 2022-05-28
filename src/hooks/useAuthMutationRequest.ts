import { DocumentNode } from "graphql";
import { Variables } from "graphql-request";
import { useMutation, UseMutationOptions } from "react-query";

import { gqlRequest } from "~/utils/helper/gql";
import { useAuthContext } from "~/context/AuthContext";
import { useTokenContext } from "~/context/TokenContext";

interface Props {
  query: DocumentNode;
  variable?: Variables;
  name: string;
  options?: UseMutationOptions;
  successTitle: string;
  ErrorResponse: { title: string; message: string }[];
  onSuccessMutation: (data: any) => void;
  onErrorMutation: (data: any) => void;
}

const useAuthMutationRequestHook = ({
  query,
  variable = {},
  name,
  options = {},
  successTitle,
  ErrorResponse,
  onSuccessMutation,
  onErrorMutation,
}: Props) => {
  const { token } = useTokenContext();
  const { setIsAuth } = useAuthContext();

  const request = async () => {
    try {
      const response = await gqlRequest({ query, variable, token });
      const data = response[name];
      const typename = data.__typename;

      if (typename === successTitle) {
        return { successData: { ...data } };
      }

      if (typename === "ErrorResponse") {
        if (["TOKEN_PARSE", "AUTHENTICATION"].includes(data.title)) {
          return { isLogout: true };
        }

        ErrorResponse.forEach((value) => {
          if (data.title === value.title && data.message === value.message) {
            return { errorData: { ...data } };
          }
        });
      }

      return {};
    } catch (error: any) {
      throw { message: "Something went wrong" };
    }
  };

  const onSuccess = (data: any) => {
    if (data.isLogout) {
      setIsAuth(false);
    }

    if (data.successData) {
      onSuccessMutation(data);
    }

    if (data.errorData) {
      onErrorMutation(data);
    }

    onError();
  };

  const onError = () => {
    console.log("Something went wrong");
  };

  const useMutationHook = useMutation(request, {
    retry: 3,
    onSuccess,
    onError,
    ...options,
  });

  return useMutationHook;
};

export default useAuthMutationRequestHook;
