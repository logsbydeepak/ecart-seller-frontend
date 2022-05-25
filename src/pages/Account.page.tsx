import { useImmer } from "use-immer";

import { NextPageLayoutType } from "~/types/nextMod";
import AccountSideBarLayout from "~/layout/AccountSideBarLayout";
import GetUserQuery from "~/utils/gql/User/GetUser.gql";
import useAuthRequestHook from "~/hooks/useAuthRequestHook";
import SideBarContent from "~/components/Sidebar/SideBarContent";

const Account: NextPageLayoutType = () => {
  const [requestStatus, setRequestStatus] = useImmer({
    isLoading: true,
    isError: false,
    isSuccess: false,
  });

  const [userInfo, setUserInfo] = useImmer({ name: "", email: "" });

  const onSuccess = (data: any) => {
    const readUser = data.readUser;
    const typename = readUser.__typename;

    if (typename === "User") {
      setRequestStatus((draft) => {
        draft.isSuccess = true;
        draft.isLoading = false;
      });

      setUserInfo((draft) => {
        draft.name = readUser.firstName + " " + readUser.lastName;
        draft.email = readUser.email;
      });
    }
  };

  const { isLoading, isError, isSuccess } = useAuthRequestHook({
    key: "User info",
    name: "readUser",
    query: GetUserQuery,
    option: {
      onSuccess,
    },
  });

  return (
    <SideBarContent
      title="Account"
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
    >
      <h1>{userInfo.name}</h1>
      <h1>{userInfo.email}</h1>
    </SideBarContent>
  );
};

Account.getLayout = AccountSideBarLayout;

export default Account;
