import { RequestDocument, Variables } from "graphql-request";
import {
  useQuery,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  QueryFunction,
  useQueryClient,
  QueryClient,
} from "react-query";
import { useAuthContext } from "~/context/AuthContext";
import { useTokenContext } from "~/context/TokenContext";
import { gqlRequest } from "~/utils/helper/gql";

interface ArgsType {
  key: QueryKey;
  query: RequestDocument;
  name: string;
  variable?: Variables;
  option?: UseQueryOptions;
}

type UseAuthRequestHookType = (args: ArgsType) => UseQueryResult;

const request = async (
  key: QueryKey,
  queryDocument: RequestDocument,
  variable: Variables,
  name: string,
  isAuth: boolean,
  setIsAuth: (authValue: boolean) => boolean,
  queryClient: QueryClient,
  token: string,
  signal?: AbortSignal
) => {
  if (!isAuth) {
    throw new Error();
  }

  try {
    const response = await gqlRequest({
      query: queryDocument,
      variable,
      signal,
      token,
    });

    const responseData = response[name];
    const typename = responseData.__typename;

    if (typename === "ErrorResponse") {
      if (
        (responseData.title === "TOKEN_PARSE",
        (responseData.message = "token expired"))
      ) {
        setIsAuth(false);
      }

      if (["TOKEN_PARSE", "AUTHENTICATION"].includes(responseData.title)) {
        queryClient.cancelQueries(key);
        setIsAuth(false);
      }
    }

    return response;
  } catch (error) {
    throw { requestError: "Something went wrong" };
  }
};

const useAuthRequestHook: UseAuthRequestHookType = ({
  key,
  query,
  name,
  variable = {},
  option = {},
}) => {
  const { isAuth, setIsAuth } = useAuthContext();
  const queryClient = useQueryClient();
  const { token } = useTokenContext();

  const performRequest: QueryFunction = ({ signal }) =>
    request(
      key,
      query,
      variable,
      name,
      isAuth,
      setIsAuth,
      queryClient,
      token,
      signal
    );

  const useQueryHook = useQuery(key, performRequest, {
    ...option,
  });

  return useQueryHook;
};

export default useAuthRequestHook;
