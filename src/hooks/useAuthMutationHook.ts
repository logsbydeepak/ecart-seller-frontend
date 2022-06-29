import { GraphQLError } from "graphql";
import { RequestDocument } from "graphql-request";
import { useMutation, UseMutationOptions } from "react-query";

import { gqlRequest } from "~/utils/helper/gql";
import { useAuthContext } from "~/context/AuthContext";

const useAuthMutationHook = <RequestResponse, RequestVariable>(
  queryKey: string,
  operation: RequestDocument,
  variable: RequestVariable,
  queryOption: UseMutationOptions<
    RequestResponse,
    GraphQLError,
    RequestResponse,
    string
  >
) => {
  const { authToken } = useAuthContext();

  const request = async () => {
    try {
      return await gqlRequest<RequestResponse, RequestVariable>(
        operation,
        variable,
        authToken
      );
    } catch (error) {
      throw { message: "Something went wrong" };
    }
  };

  return useMutation(queryKey, request, queryOption);
};

export default useAuthMutationHook;
