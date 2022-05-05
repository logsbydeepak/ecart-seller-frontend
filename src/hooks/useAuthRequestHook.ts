import { RequestDocument, Variables } from "graphql-request";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";
import { useAuthContext } from "~/context/AuthContext";
import { gqlRequest } from "~/utils/helper/gql";
import useUpdateSession from "./useUpdateSession";

type ReturnType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

type ArgsType = {
  queryKey: QueryKey;
  name: string;
  onError?: (data: any) => void;
  onSuccess: (data: any) => void;
  GQLQuery: RequestDocument;
  GQLQueryVariable?: Variables | {};
  queryOption?: UseQueryOptions | {};
};

type useAuthRequestHookType = (args: ArgsType) => ReturnType;

const useAuthRequestHook: useAuthRequestHookType = ({
  queryKey,
  name,
  onError = () => {},
  onSuccess,
  GQLQuery,
  GQLQueryVariable = {},
  queryOption = {},
}) => {
  const { setIsAuth } = useAuthContext();

  const onSuccessUpdateSession = () => {
    refetch();
  };

  const onErrorUpdateSession = () => {};

  const { mutateAsync } = useUpdateSession(
    onSuccessUpdateSession,
    onErrorUpdateSession
  );

  const request = async () => {
    try {
      const req = await gqlRequest(GQLQuery, GQLQueryVariable);
      const data = req[name];
      const typename = data.__typename;
      const logoutTitle = ["TOKEN_PARSE", "AUTHENTICATION"];

      if (typename === "ErrorResponse") {
        if (data.title === "TOKEN_PARSE" && data.message === "token expired") {
          await mutateAsync();
          return;
        }

        if (logoutTitle.includes(data.title)) {
          setIsAuth(false);
          return;
        }

        throw new Error();
      }

      return req;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  const { isLoading, isSuccess, isError, refetch } = useQuery(
    queryKey,
    request,
    {
      onError,
      onSuccess,
      ...queryOption,
    }
  );

  return { isLoading, isSuccess, isError };
};

export default useAuthRequestHook;
