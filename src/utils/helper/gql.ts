import { GraphQLClient, RequestDocument } from "graphql-request";

export const gqlRequest = <RequestResponse, RequestVariable>(
  operation: RequestDocument,
  variable: RequestVariable,
  token?: string
): Promise<RequestResponse> => {
  return new GraphQLClient(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
    credentials: "include",
    mode: "cors",
    headers: token ? { token } : {},
  }).request(operation, variable);
};
