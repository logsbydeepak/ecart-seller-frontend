import { GraphQLClient, RequestDocument, Variables } from "graphql-request";

export const gqlRequest = (query: RequestDocument, variable: Variables) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
    credentials: "include",
    mode: "cors",
  }).request(query, variable);
