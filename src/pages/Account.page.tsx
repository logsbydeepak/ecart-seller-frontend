import { useImmer } from "use-immer";

import { NextPageLayoutType } from "~/types/nextMod";
import AccountSideBarLayout from "~/layout/AccountSideBarLayout";
import GetUserQuery from "~/utils/gql/User/GetUser.gql";
import SideBarContent from "~/components/Sidebar/SideBarContent";
import { FC, useState } from "react";
import { classNames } from "~/utils/helper/tailwind";
import LogoutAllModal from "~/components/Modal/LogoutAllModal";
import useAuthQueryRequestHook from "~/hooks/useAuthQueryRequest";
import EditNameModal from "~/components/Modal/EditNameModal";
import Show from "~/components/Show";
import EditEmailModal from "~/components/Modal/EditEmailModal";
import EditPasswordModal from "~/components/Modal/EditPasswordModal";

const Account: NextPageLayoutType = () => {
  const [userInfo, setUserInfo] = useImmer({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isOpenLogoutAllModal, setIsOpenLogoutAllModal] = useState(false);
  const [isOpenEditNameModal, setIsOpenEditNameModal] = useState(false);
  const [isOpenEditEmailModal, setIsOpenEditEmailModal] = useState(false);
  const [isOpenEditPasswordModal, setIsOpenEditPasswordModal] = useState(false);

  const onSuccessQuery = (data: any) => {
    const readUser = data.readUser;
    const typename = readUser.__typename;

    if (typename === "User") {
      setUserInfo((draft) => {
        draft.firstName = readUser.firstName;
        draft.lastName = readUser.lastName;
        draft.email = readUser.email;
      });
    }
  };

  const onErrorQuery = () => {};

  const { isLoading, isError, isSuccess } = useAuthQueryRequestHook({
    key: "User info",
    name: "readUser",
    query: GetUserQuery,
    successTitle: "User",
    onSuccessQuery,
    onErrorQuery,
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
      <Show when={isOpenLogoutAllModal}>
        <LogoutAllModal
          isOpen={isOpenLogoutAllModal}
          setIsOpen={setIsOpenLogoutAllModal}
        />
      </Show>

      <Show when={isOpenEditNameModal}>
        <EditNameModal
          isOpen={isOpenEditNameModal}
          setIsOpen={setIsOpenEditNameModal}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
        />
      </Show>

      <Show when={isOpenEditEmailModal}>
        <EditEmailModal
          isOpen={isOpenEditEmailModal}
          setIsOpen={setIsOpenEditEmailModal}
          email={userInfo.email}
        />
      </Show>

      <Show when={isOpenEditPasswordModal}>
        <EditPasswordModal
          isOpen={isOpenEditPasswordModal}
          setIsOpen={setIsOpenEditPasswordModal}
        />
      </Show>

      <div className="max-w-2xl">
        <div className="rounded-lg border-2 border-neutral-200 p-8">
          <ItemContainer
            fieldValue="Name"
            value={`${userInfo.firstName} ${userInfo.lastName}`}
            onClick={() => setIsOpenEditNameModal(true)}
          />
          <Divider />
          <ItemContainer
            fieldValue="Email"
            value={userInfo.email}
            onClick={() => setIsOpenEditEmailModal(true)}
          />
          <Divider />
          <ItemContainer
            fieldValue="Password"
            value="*******"
            onClick={() => setIsOpenEditPasswordModal(true)}
          />
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
  onClick: () => void;
  className?: string;
}> = ({ fieldValue, value, onClick, className }) => {
  return (
    <div className={classNames(className, "")}>
      <p className="text-base font-semibold">{fieldValue}</p>
      <div className="flex items-center justify-between">
        <p className="text-sm">{value}</p>
        <button
          onClick={onClick}
          className="rounded-md bg-indigo-600 px-6 py-2 text-sm text-white hover:bg-indigo-700"
        >
          Edit
        </button>
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
