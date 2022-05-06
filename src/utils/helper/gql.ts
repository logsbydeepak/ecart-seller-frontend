import { GraphQLClient, RequestDocument, Variables } from "graphql-request";

interface Args {
  query: RequestDocument;
  variable?: Variables;
  signal?: AbortSignal;
}

type GqlRequestType = (args: Args) => Promise<any>;

export const gqlRequest: GqlRequestType = ({ query, variable = {}, signal }) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
    signal,
    credentials: "include",
    mode: "cors",
  }).request(query, variable);
