import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { PencilIcon } from "@heroicons/react/outline";

import Show from "~/components/Show";
import SideBarContent from "~/components/Sidebar/SideBarContent";

import { NextPageLayoutType } from "~/types/nextMod";
import AccountSideBarLayout from "~/layout/AccountSideBarLayout";

import useReadUserQuery from "./useReadUserQuery";

import LogoutAllModal from "./components/LogoutAllModal";
import DeleteAccountModal from "./components/DeleteAccountModal";
import UpdateUserNameModal from "./components/UpdateUserNameModal";
import UpdateUserEmailModal from "./components/UpdateUserEmailModal";
import RemoveUserPictureModal from "./components/RemoveUserPictureModal";
import UpdateUserPictureModal from "./components/UpdateUserPictureModal";
import UpdateUserPasswordModal from "./components/UpdateUserPasswordModal";

const defaultUserInfoData = {
  firstName: "",
  lastName: "",
  email: "",
  picture: "",
};

const AccountPage: NextPageLayoutType = () => {
  const [userInfo, setUserInfo] = useState(defaultUserInfoData);

  const [isDeleteUserModal, setIsDeleteUserModal] = useState(false);
  const [isOpenEditNameModal, setIsOpenEditNameModal] = useState(false);
  const [isOpenEditEmailModal, setIsOpenEditEmailModal] = useState(false);
  const [isOpenLogoutAllModal, setIsOpenLogoutAllModal] = useState(false);
  const [isOpenEditPasswordModal, setIsOpenEditPasswordModal] = useState(false);
  const [isOpenUpdatePictureModal, setIsOpenUpdatePictureModal] =
    useState(false);
  const [isOpenRemovePictureModal, setIsOpenRemovePictureModal] =
    useState(false);

  const { isError, isLoading, isSuccess } = useReadUserQuery(setUserInfo);
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

      <Show when={isOpenRemovePictureModal} isAnimation={true}>
        <RemoveUserPictureModal
          isOpen={isOpenRemovePictureModal}
          setIsOpen={setIsOpenRemovePictureModal}
          setIsOpenUpdateUserPicture={setIsOpenUpdatePictureModal}
          picture={userInfo.picture}
        />
      </Show>

      <Show when={isOpenUpdatePictureModal} isAnimation={true}>
        <UpdateUserPictureModal
          isOpen={isOpenUpdatePictureModal}
          setIsOpen={setIsOpenUpdatePictureModal}
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
            picture={userInfo.picture}
            onClick={() => setIsOpenRemovePictureModal(true)}
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

const ItemContainer = ({
  fieldValue,
  value,
  onClick,
  className,
}: {
  fieldValue: string;
  value: string;
  onClick: () => void;
  className?: string;
}) => {
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

const ItemContainerButton = ({
  fieldName,
  handleOnClick,
}: {
  fieldName: string;
  handleOnClick: () => void;
}) => {
  return (
    <button
      className="w-full text-center text-base font-semibold hover:text-indigo-700"
      onClick={handleOnClick}
    >
      {fieldName}
    </button>
  );
};

const ItemContainerImage = ({
  picture,
  onClick,
}: {
  onClick: () => void;
  picture: string;
}) => {
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

const Divider = () => (
  <div className="my-5 h-0.5 rounded-full bg-neutral-200"></div>
);

AccountPage.getLayout = AccountSideBarLayout;

export default AccountPage;
