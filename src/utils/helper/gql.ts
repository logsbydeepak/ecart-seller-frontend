import { GraphQLClient, RequestDocument, Variables } from "graphql-request";
import { useAuthContext } from "~/context/AuthContext";

interface Args {
  query: RequestDocument;
  variable?: Variables;
  signal?: AbortSignal;
  token?: string;
}

type GqlRequestType = (args: Args) => Promise<any>;

export const gqlRequest: GqlRequestType = ({
  query,
  variable = {},
  signal,
  token,
}) => {
  const headers = token ? { headers: { token: token } } : {};

  return new GraphQLClient(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
    signal,
    credentials: "include",
    mode: "cors",
    ...headers,
  }).request(query, variable);
};
