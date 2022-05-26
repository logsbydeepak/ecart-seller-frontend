import { useImmer } from "use-immer";

import { NextPageLayoutType } from "~/types/nextMod";
import AccountSideBarLayout from "~/layout/AccountSideBarLayout";
import GetUserQuery from "~/utils/gql/User/GetUser.gql";
import useAuthRequestHook from "~/hooks/useAuthRequestHook";
import SideBarContent from "~/components/Sidebar/SideBarContent";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { classNames } from "~/utils/helper/tailwind";
import LogoutAllModal from "~/components/Modal/LogoutAllModal";

const Account: NextPageLayoutType = () => {
  const [userInfo, setUserInfo] = useImmer({ name: "", email: "" });
  const [isOpenLogoutAllModal, setIsOpenLogoutAllModal] = useState(false);

  const onSuccess = (data: any) => {
    const readUser = data.readUser;
    const typename = readUser.__typename;

    if (typename === "User") {
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

  const handleDeleteAccount = () => {};

  const handleLogoutAll = () => {
    setIsOpenLogoutAllModal(true);
  };

  return (
    <SideBarContent
      title="Account"
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
    >
      <LogoutAllModal
        isOpen={isOpenLogoutAllModal}
        setIsOpen={setIsOpenLogoutAllModal}
      />
      <div className="max-w-2xl">
        <div className="rounded-lg border-2 border-neutral-200 p-8">
          <ItemContainer fieldValue="Name" value={userInfo.name} url="" />
          <Divider />
          <ItemContainer fieldValue="Email" value={userInfo.email} url="" />
          <Divider />
          <ItemContainer fieldValue="Password" value="*******" url="" />
        </div>

        <div className="mt-8 rounded-lg border-2 border-neutral-200 p-8">
          <ItemContainerButton
            fieldName="Logout All"
            handleOnClick={handleLogoutAll}
          />
          <Divider />
          <ItemContainerButton
            fieldName="Delete Account"
            handleOnClick={handleDeleteAccount}
          />
        </div>
      </div>
    </SideBarContent>
  );
};

const ItemContainer: FC<{
  fieldValue: string;
  value: string;
  url: string;
  className?: string;
}> = ({ fieldValue, value, url, className }) => {
  return (
    <div className={classNames(className, "")}>
      <p className="text-base font-semibold">{fieldValue}</p>
      <div className="flex items-center justify-between">
        <p className="text-sm">{value}</p>
        <Link href={url}>
          <a className="rounded-sm bg-indigo-600 px-5 py-2 text-sm text-white">
            EDIT
          </a>
        </Link>
      </div>
    </div>
  );
};

const ItemContainerButton: FC<{
  fieldName: string;
  handleOnClick: () => void;
}> = ({ fieldName, handleOnClick }) => {
  return (
    <button
      className="w-full text-center text-base font-semibold hover:text-indigo-700"
      onClick={handleOnClick}
    >
      {fieldName}
    </button>
  );
};

const Divider: FC = () => (
  <div className="my-5 h-0.5 rounded-full bg-neutral-200"></div>
);

Account.getLayout = AccountSideBarLayout;

export default Account;
