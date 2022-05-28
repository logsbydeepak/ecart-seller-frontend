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
      const request = await gqlRequest({ query, variable, token });
      return request;
    } catch (error: any) {
      throw { message: "Something went wrong" };
    }
  };

  const onSuccess = (data: any) => {
    const responseData = data[name];
    const typename = responseData.__typename;

    if (typename === successTitle) {
      onSuccessMutation(data);
    }

    if (["TOKEN_PARSE", "AUTHENTICATION"].includes(data.title)) {
      setIsAuth(false);
    }

    ErrorResponse.forEach((value) => {
      if (
        responseData.title === value.title &&
        responseData.message === value.message
      ) {
        onErrorMutation(data);
      }
    });
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
