import clsx from "clsx";
import { FC, useState } from "react";

import LogoutAllModal from "~/components/Modal/LogoutAllModal";
import SideBarContent from "~/components/Sidebar/SideBarContent";
import DeleteAccountModal from "~/components/Modal/DeleteAccountModal";
import UpdateUserNameModal from "~/components/Modal/UpdateUserNameModal";
import { v4 as uuidv4 } from "uuid";
import UpdateUserEmailModal from "~/components/Modal/UpdateUserEmailModal";
import UpdateUserPasswordModal from "~/components/Modal/UpdateUserPasswordModal";

import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import { NextPageLayoutType } from "~/types/nextMod";
import { ReadUserQuery, ReadUserQueryVariables } from "~/types/graphql";

import useAuthQueryHook from "~/hooks/useAuthQueryHook";
import ReadUserOperation from "~/utils/gql/User/ReadUser.gql";
import AccountSideBarLayout from "~/layout/AccountSideBarLayout";
import Show from "~/components/Show";

const defaultUserInfoData = {
  firstName: "",
  lastName: "",
  email: "",
  picture: "",
};

const Account: NextPageLayoutType = () => {
  const { setAuthFalse } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const [userInfo, setUserInfo] = useState(defaultUserInfoData);
  const [isDeleteUserModal, setIsDeleteUserModal] = useState(false);
  const [isOpenEditNameModal, setIsOpenEditNameModal] = useState(false);
  const [isOpenEditEmailModal, setIsOpenEditEmailModal] = useState(false);
  const [isOpenLogoutAllModal, setIsOpenLogoutAllModal] = useState(false);
  const [isOpenEditPasswordModal, setIsOpenEditPasswordModal] = useState(false);

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const key = {
    key1: uuidv4(),
    key2: uuidv4(),
    key3: uuidv4(),
    key4: uuidv4(),
    key5: uuidv4(),
    key6: uuidv4(),
    key7: uuidv4(),
  };

  const { isError, isLoading, isSuccess } = useAuthQueryHook<
    ReadUserQuery,
    ReadUserQueryVariables
  >(
    "ReadUserOperation",
    ReadUserOperation,
    {},
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
              picture: responseData.picture,
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

  // const id = uuidv4();

  return (
    <SideBarContent
      title="Account"
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
    >
      <LogoutAllModal
        key={uuidv4()}
        isOpen={isOpenLogoutAllModal}
        setIsOpen={setIsOpenLogoutAllModal}
      />

      <UpdateUserNameModal
        isOpen={isOpenEditNameModal}
        setIsOpen={setIsOpenEditNameModal}
        firstName={userInfo.firstName}
        lastName={userInfo.lastName}
      />

      <UpdateUserEmailModal
        key={uuidv4()}
        isOpen={isOpenEditEmailModal}
        setIsOpen={setIsOpenEditEmailModal}
        email={userInfo.email}
      />

      <UpdateUserPasswordModal
        key={uuidv4()}
        isOpen={isOpenEditPasswordModal}
        setIsOpen={setIsOpenEditPasswordModal}
      />

      <DeleteAccountModal
        key={uuidv4()}
        isOpen={isDeleteUserModal}
        setIsOpen={setIsDeleteUserModal}
      />

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
            handleOnClick={() => setIsOpenLogoutAllModal(true)}
          />
          <Divider />
          <ItemContainerButton
            fieldName="Delete Account"
            handleOnClick={() => setIsDeleteUserModal(true)}
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
    <div className={clsx(className, "")}>
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
