import { DocumentNode } from "graphql";
import { Variables } from "graphql-request";
import { useQuery, UseQueryOptions } from "react-query";

import { gqlRequest } from "~/utils/helper/gql";
import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

interface Props {
  query: DocumentNode;
  variable?: Variables;
  name: string;
  options?: UseQueryOptions;
  successTitle: string;
  ErrorResponse?: { title: string; message: string }[];
  onSuccessQuery: (data: any) => void;
  onErrorQuery: (data: any) => void;
  key: string;
}

const useAuthQueryRequestHook = ({
  query,
  variable = {},
  name,
  options = {},
  successTitle,
  ErrorResponse = [],
  onSuccessQuery,
  onErrorQuery,
  key,
}: Props) => {
  const { authToken, setAuthToken } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const request = async () => {
    try {
      const request = await gqlRequest({ query, variable, token: authToken });
      return request;
    } catch (error: any) {
      throw { message: "Something went wrong" };
    }
  };

  const onSuccess = (data: any) => {
    const responseData = data[name];
    const typename = responseData.__typename;

    if (typename === successTitle) {
      onSuccessQuery(data);
    }

    if (["TOKEN_PARSE", "AUTHENTICATION"].includes(data.title)) {
      setAuthToken("");
    }

    ErrorResponse.forEach((value) => {
      if (
        responseData.title === value.title &&
        responseData.message === value.message
      ) {
        onErrorQuery(data);
      }
    });
  };

  const onError = () => {
    addNotification("error", "Something went wrong!");
  };

  const useQueryHook = useQuery({
    queryKey: key,
    queryFn: request,
    onError,
    onSuccess,
    ...options,
  });

  return useQueryHook;
};

export default useAuthQueryRequestHook;
