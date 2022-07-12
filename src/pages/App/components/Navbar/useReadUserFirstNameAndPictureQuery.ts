import { Dispatch, SetStateAction } from "react";

import { useAuthContext } from "~/context/AuthContext";
import useAuthQueryHook from "~/hooks/useAuthQueryHook";
import { useNotificationContext } from "~/context/NotificationContext";

import ReadUserFirstNameAndPictureOperation from "./ReadUserFirstNameAndPicture.gql";

import {
  ReadUserFirstNameAndPictureQuery,
  ReadUserFirstNameAndPictureQueryVariables,
} from "~/types/graphql";
import showPicture from "~/utils/helper/showPicture";

const useReadUserFirstNameAndPictureQuery = (
  setUserInfo: Dispatch<
    SetStateAction<{
      firstName: string;
      picture: string;
    }>
  >
) => {
  const { setAuthFalse } = useAuthContext();
  const { dispatchNotification } = useNotificationContext();

  const errorNotification = () =>
    dispatchNotification({
      type: "add",
      status: "error",
      message: "Something went wrong",
    });

  return useAuthQueryHook<
    ReadUserFirstNameAndPictureQuery,
    ReadUserFirstNameAndPictureQueryVariables
  >(
    "ReadUserFirstNameAndPictureOperation",
    ReadUserFirstNameAndPictureOperation,
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

export default useReadUserFirstNameAndPictureQuery;
