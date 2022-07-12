import { Dispatch, SetStateAction } from "react";
import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";
import useAuthQueryHook from "~/hooks/useAuthQueryHook";
import { ReadUserQuery, ReadUserQueryVariables } from "~/types/graphql";
import showPicture from "~/utils/helper/showPicture";
import ReadUserOperation from "./ReadUser.gql";

const useReadUserQuery = (
  setUserInfo: Dispatch<
    SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      picture: string;
    }>
  >
) => {
  const { dispatchNotification } = useNotificationContext();
  const { setAuthFalse } = useAuthContext();

  const errorNotification = () =>
    dispatchNotification({
      type: "add",
      status: "error",
      message: "Something went wrong",
    });
  return useAuthQueryHook<ReadUserQuery, ReadUserQueryVariables>(
    "ReadUserOperation",
    ReadUserOperation,
    () => ({}),
    {
      onError: () => errorNotification(),
      onSuccess: (data) => {
        if (!data) return errorNotification();

        const responseData = data.readUser;

        switch (responseData.__typename) {
          case "User":
            setUserInfo({
              firstName: responseData.firstName,
              lastName: responseData.lastName,
              email: responseData.email,
              picture: showPicture(responseData.picture),
            });
            break;

          case "TokenError":
            setAuthFalse();
            break;

          default:
            errorNotification();
        }
      },
    }
  );
};

export default useReadUserQuery;
