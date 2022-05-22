import { FC, useMemo, useState } from "react";

import { useMutation } from "react-query";
import { gqlRequest } from "~/utils/helper/gql";
import { useAuthContext } from "~/context/AuthContext";
import { useTokenContext } from "~/context/TokenContext";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import { customUseLayoutEffect } from "~/utils/helper/nextMod";
import UpdateSessionQuery from "~/utils/gql/Session/UpdateSession.gql";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import Spinner from "~/components/Spinner";
import Show from "~/components/Show";

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

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onError = () => {
    setIsError(true);
  };

  const onSuccess = (data: any) => {
    const updateSession = data.updateSession;
    const typename = updateSession.__typename;

    if (typename === "AccessToken") {
      setToken(updateSession.token);
    }

    if (typename === "ErrorResponse") {
      if (["TOKEN_PARSE", "AUTHENTICATION"].includes(updateSession.title)) {
        setIsAuth(false);
      } else {
        setIsError(true);
      }
    }
  };

  const { mutateAsync } = useMutation(updateSessionRequest, {
    retry: 3,
    onError,
    onSuccess,
  });

  customUseLayoutEffect(() => {
    if (token === "" && isAuth === true) {
      setIsLoading(true);
      mutateAsync();
    } else {
      setIsAppReady(true);
    }
  }, [isAuth, mutateAsync, token]);

  if (!isAppReady) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <ShoppingCartIcon className="mb-2 h-14 text-indigo-600" />
        <Show when={isLoading}>
          <Spinner className="h-4 w-4 text-indigo-500" />
        </Show>
        <Show when={isError}>
          <p className="pb-4 text-center text-neutral-400">
            Something went wrong
          </p>{" "}
        </Show>
      </div>
    );
  }

  return <>{children}</>;
};

export default TokenLayout;
