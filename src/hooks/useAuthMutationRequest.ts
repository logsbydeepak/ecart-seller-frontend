import { DocumentNode, TypeNameMetaFieldDef } from "graphql";
import { Variables } from "graphql-request";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

import { gqlRequest } from "~/utils/helper/gql";
import { useAuthContext } from "~/context/AuthContext";
import { useTokenContext } from "~/context/TokenContext";

interface Props {
  query: DocumentNode;
  variable?: Variables;
  name: string;
  options?: UseMutationOptions;
  successTitle: string;
  ErrorResponse: { title: string; message: string }[];
}

const useAuthMutationRequestHook = ({
  query,
  variable = {},
  name,
  options = {},
  successTitle,
  ErrorResponse,
}: Props) => {
  const { token } = useTokenContext();
  const { setIsAuth, isAuth } = useAuthContext();

  const request = async () => {
    try {
      if (!isAuth && !token) throw {};

      const response = await gqlRequest({ query, variable, token });
      const data = response[name];
      const typename = data.__typename;

      if (typename === successTitle) {
        return data;
      }

      if (typename === "ErrorResponse") {
        if (["TOKEN_PARSE", "AUTHENTICATION"].includes(data.title)) {
          setIsAuth(false);
        }

        ErrorResponse.forEach((value) => {
          if (data.title === value.title && data.message === value.message) {
            throw { isData: true, data: { ...data } };
          }
        });
      }

      throw {};
    } catch (error: any) {
      if (error.isData) {
        return error.data;
      }
      throw { message: "Something went wrong" };
    }
  };

  const useMutationHook = useMutation(request, { retry: 3, ...options });

  return useMutationHook;
};

export default useAuthMutationRequestHook;
