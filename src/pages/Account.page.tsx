import clsx from "clsx";
import { FC, useState } from "react";

import Show from "~/components/Show";
import LogoutAllModal from "~/components/Modal/LogoutAllModal";
import SideBarContent from "~/components/Sidebar/SideBarContent";
import DeleteAccountModal from "~/components/Modal/DeleteAccountModal";
import UpdateUserNameModal from "~/components/Modal/UpdateUserNameModal";
import UpdateUserEmailModal from "~/components/Modal/UpdateUserEmailModal";
import RemoveUserPictureModal from "~/components/Modal/RemoveUserPictureModal";
import UpdateUserPasswordModal from "~/components/Modal/UpdateUserPasswordModal";

import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import { NextPageLayoutType } from "~/types/nextMod";
import { ReadUserQuery, ReadUserQueryVariables } from "~/types/graphql";

import useAuthQueryHook from "~/hooks/useAuthQueryHook";
import ReadUserOperation from "~/utils/gql/User/ReadUser.gql";
import AccountSideBarLayout from "~/layout/AccountSideBarLayout";
import { PencilIcon } from "@heroicons/react/outline";
import Image from "next/image";

const defaultUserInfoData = {
  firstName: "",
  lastName: "",
  email: "",
  picture: "",
};

const picture =
  "https://images.unsplash.com/photo-1637633198300-08beaec68c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80";

const Account: NextPageLayoutType = () => {
  const { setAuthFalse } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const [userInfo, setUserInfo] = useState(defaultUserInfoData);
  const [isDeleteUserModal, setIsDeleteUserModal] = useState(false);
  const [isOpenEditNameModal, setIsOpenEditNameModal] = useState(false);
  const [isOpenEditEmailModal, setIsOpenEditEmailModal] = useState(false);
  const [isOpenLogoutAllModal, setIsOpenLogoutAllModal] = useState(false);
  const [isOpenEditPasswordModal, setIsOpenEditPasswordModal] = useState(false);
  const [isOpenUpdatePictureModal, setIsOpenUpdatePictureModal] =
    useState(true);

  const [isOpenRemovePictureModal, setIsOpenRevemoPictureModal] =
    useState(true);

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

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

  return (
    <SideBarContent
      title="Account"
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
    >
      <Show when={isOpenLogoutAllModal} isAnimation={true}>
        <LogoutAllModal
          isOpen={isOpenLogoutAllModal}
          setIsOpen={setIsOpenLogoutAllModal}
        />
      </Show>

      <Show when={isOpenUpdatePictureModal} isAnimation={true}>
        <RemoveUserPictureModal
          isOpen={isOpenUpdatePictureModal}
          setIsOpen={setIsOpenUpdatePictureModal}
          picture={picture}
        />
      </Show>

      <Show when={isOpenEditNameModal} isAnimation={true}>
        <UpdateUserNameModal
          isOpen={isOpenEditNameModal}
          setIsOpen={setIsOpenEditNameModal}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
        />
      </Show>

      <Show when={isOpenEditEmailModal} isAnimation={true}>
        <UpdateUserEmailModal
          isOpen={isOpenEditEmailModal}
          setIsOpen={setIsOpenEditEmailModal}
          email={userInfo.email}
        />
      </Show>

      <Show when={isOpenEditPasswordModal} isAnimation={true}>
        <UpdateUserPasswordModal
          isOpen={isOpenEditPasswordModal}
          setIsOpen={setIsOpenEditPasswordModal}
        />
      </Show>

      <Show when={isDeleteUserModal} isAnimation={true}>
        <DeleteAccountModal
          isOpen={isDeleteUserModal}
          setIsOpen={setIsDeleteUserModal}
        />
      </Show>

      <div className="max-w-2xl">
        <div className="rounded-lg border-2 border-neutral-200 p-8">
          <ItemContainerImage
            picture={picture}
            onClick={() => setIsOpenUpdatePictureModal(true)}
          />
        </div>
      </div>

      <div className="my-8 max-w-2xl">
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

        <div className="rounded-lg border-2 border-neutral-200 p-8">
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
    <div className={clsx(className)}>
      <p className="text-base font-semibold">{fieldValue}</p>
      <div className="flex items-center justify-between">
        <p className="text-sm">{value}</p>
        <button
          onClick={onClick}
          className="rounded-sm bg-indigo-600 p-2 text-sm text-white hover:bg-indigo-700"
        >
          <PencilIcon className="h-4 w-4" />
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

const ItemContainerImage: FC<{
  onClick: () => void;
  picture: string;
}> = ({ picture, onClick }) => {
  return (
    <div>
      <p className="text-base font-semibold">Picture</p>

      <div className="flex items-center justify-between pt-4">
        <Image
          src={picture}
          alt="profile picture"
          width="100"
          height="100"
          className="rounded-full"
        />
        <button
          onClick={onClick}
          className="rounded-sm bg-indigo-600 p-2 text-sm text-white hover:bg-indigo-700"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const Divider: FC = () => (
  <div className="my-5 h-0.5 rounded-full bg-neutral-200"></div>
);

Account.getLayout = AccountSideBarLayout;

export default Account;
