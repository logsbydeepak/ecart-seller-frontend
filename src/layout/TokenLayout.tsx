import { FC, useState } from "react";

import { useMutation } from "react-query";
import { gqlRequest } from "~/utils/helper/gql";
import { useAuthContext } from "~/context/AuthContext";
import { useTokenContext } from "~/context/TokenContext";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import { customUseLayoutEffect } from "~/utils/helper/nextMod";
import UpdateSessionQuery from "~/utils/gql/Session/UpdateSession.gql";

const updateSessionRequest = async () => {
  try {
    return await gqlRequest({ query: UpdateSessionQuery });
  } catch (error) {
    throw new Error();
  }
};

const TokenLayout: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const { isAuth, setIsAuth } = useAuthContext();
  const { token, setToken } = useTokenContext();
  const [isAppReady, setIsAppReady] = useState(false);

  const onError = () => {};

  const onSuccess = (data: any) => {
    const updateSession = data.updateSession;
    const typename = updateSession.__typename;

    if (typename === "AccessToken") {
      setToken(updateSession.token);
    }

    if (typename === "ErrorResponse") {
      if (["TOKEN_PARSE", "AUTHENTICATION"].includes(updateSession.title)) {
        setIsAuth(false);
      }
    }
  };

  const { mutateAsync, isLoading, isError } = useMutation(
    updateSessionRequest,
    {
      retry: 3,
      onError,
      onSuccess,
    }
  );

  customUseLayoutEffect(() => {
    if (token === "" && isAuth === true) {
      mutateAsync();
    } else {
      setIsAppReady(true);
    }
  }, [isAuth, token, mutateAsync]);

  if (!isAppReady) {
    return (
      <h1>
        {isLoading && "Getting Token"} {isError && "Error"}
      </h1>
    );
  }

  return <>{children}</>;
};

export default TokenLayout;
