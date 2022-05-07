import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  QueryKey,
} from "react-query";
import { useAuthContext } from "~/context/AuthContext";
import { gqlRequest } from "~/utils/helper/gql";
import UpdateSessionQuery from "~/utils/gql/Session/UpdateSession.gql";

const useUpdateSession = (option: UseMutationOptions = {}, key: QueryKey) => {
  const { isAuth, setIsAuth } = useAuthContext();
  const queryClient = useQueryClient();

  const updateSessionRequestHandler = async () => {
    if (!isAuth) {
      throw new Error();
    }
    try {
      const response = await gqlRequest({ query: UpdateSessionQuery });
      const responseData = response.updateSession;
      const typename = response.__typename;

      if (typename === "ErrorResponse") {
        if (["TOKEN_PARSE", "AUTHENTICATION"].includes(responseData.title)) {
          queryClient.cancelMutations();
          queryClient.cancelQueries(key);
          setIsAuth(false);
        } else {
          throw new Error();
        }
      }
      return response;
    } catch (error) {
      throw { requestError: "Something went wrong while updating session" };
    }
  };

  const { mutateAsync } = useMutation(updateSessionRequestHandler, {
    retry: 3,
    ...option,
  });

  return { mutateAsync };
};

export default useUpdateSession;
