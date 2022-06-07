import { DocumentNode } from "graphql";
import { Variables } from "graphql-request";
import { useMutation, UseMutationOptions } from "react-query";

import { gqlRequest } from "~/utils/helper/gql";
import { useAuthContext } from "~/context/AuthContext";

interface Props {
  query: DocumentNode;
  variable: () => Variables;
  name: string;
  options?: UseMutationOptions;
  successTitle: string;
  ErrorResponse?: { title: string; message: string }[];
  onSuccessMutation: (data: any) => void;
  onErrorMutation: (data: any) => void;
}

const useAuthMutationRequestHook = ({
  query,
  variable,
  name,
  options = {},
  successTitle,
  ErrorResponse = [],
  onSuccessMutation,
  onErrorMutation,
}: Props) => {
  const { authToken, setAuthToken } = useAuthContext();

  const request = async () => {
    try {
      const request = await gqlRequest({
        query,
        variable: variable(),
        token: authToken,
      });
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
      setAuthToken("");
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
