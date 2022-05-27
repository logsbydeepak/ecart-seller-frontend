import { DocumentNode } from "graphql";
import { Variables } from "graphql-request";
import { useMutation, UseMutationOptions } from "react-query";

import { gqlRequest } from "~/utils/helper/gql";
import { useAuthContext } from "~/context/AuthContext";
import { useTokenContext } from "~/context/TokenContext";

interface Props {
  query: DocumentNode;
  variable?: Variables;
  name: string;
  expectedTypeName: string[];
  options?: UseMutationOptions;
}

const useAuthMutationRequestHook = ({
  query,
  variable = {},
  name,
  expectedTypeName,
  options = {},
}: Props) => {
  const { token } = useTokenContext();
  const { setIsAuth, isAuth } = useAuthContext();

  const request = async () => {
    try {
      if (!isAuth && !token) {
        throw {};
      }

      const response = await gqlRequest({ query, variable, token });
      const data = response[name];
      const typename = data.__typename;

      if (typename === "ErrorResponse") {
        if (["TOKEN_PARSE", "AUTHENTICATION"].includes(data.title)) {
          setIsAuth(false);
          return;
        }
      }

      if (expectedTypeName.includes(typename)) {
        return data;
      }

      throw {};
    } catch (error) {
      throw { message: "Something went wrong" };
    }
  };

  const useMutationHook = useMutation(request, { retry: 3, ...options });

  return useMutationHook;
};

export default useAuthMutationRequestHook;
