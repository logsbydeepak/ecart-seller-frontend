import { GraphQLError } from "graphql";
import { RequestDocument } from "graphql-request";
import { useQuery, UseQueryOptions } from "react-query";

import { gqlRequest } from "~/utils/helper/gql";
import { useAuthContext } from "~/context/AuthContext";

const useAuthQueryHook = <RequestResponse, RequestVariable>(
  queryKey: string,
  operation: RequestDocument,
  variable: () => RequestVariable,
  queryOption: UseQueryOptions<
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

  return useQuery(queryKey, request, {
    refetchOnWindowFocus: false,
    ...queryOption,
  });
};

export default useAuthQueryHook;
