import { useMutation } from "react-query";
import { useAuthContext } from "~/context/AuthContext";
import { gqlRequest } from "~/utils/helper/gql";
import UpdateSessionQuery from "~/utils/gql/Session/UpdateSession.gql";

const useUpdateSession = (onSuccess: () => void, onError: () => void) => {
  const { setIsAuth } = useAuthContext();
  const updateSessionRequestHandler = async () => {
    try {
      const updateSessionRequest = await gqlRequest(UpdateSessionQuery);
      const updateSession = updateSessionRequest.updateSession;
      const logoutTitle = ["TOKEN_PARSE", "AUTHENTICATION"];

      if (updateSession.__typename === "ErrorResponse") {
        if (logoutTitle.includes(updateSession.title)) {
          setIsAuth(false);
        } else {
          throw new Error();
        }
      }

      return updateSession;
    } catch (error) {
      throw { message: "Something went wrong while updating session" };
    }
  };

  const { isSuccess, mutateAsync } = useMutation(updateSessionRequestHandler, {
    retry: 3,
    onSuccess,
    onError,
  });

  return { mutateAsync };
};

export default useUpdateSession;
