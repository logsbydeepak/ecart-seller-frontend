import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import { FC, ReactNode, useState } from "react";
import { CogIcon, LogoutIcon } from "@heroicons/react/outline";

import Show from "~/components/Show";
import LogoutModal from "~/components/Modal/LogoutModal";

import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import {
  ReadUserFirstNameAndPictureQuery,
  ReadUserFirstNameAndPictureQueryVariables,
} from "~/types/graphql";

import useAuthQueryHook from "~/hooks/useAuthQueryHook";
import ReadUserFirstNameAndPictureOperation from "~/utils/gql/User/ReadUserFirstNameAndPicture.gql";

const defaultData = {
  firstName: "UserName",
  picture:
    "https://images.unsplash.com/photo-1637633198300-08beaec68c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
};

const AuthNavbarItem: FC = () => {
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const [userInfo, setUserInfo] = useState(defaultData);
  const { addNotification } = useNotificationContext();

  const { setAuthFalse } = useAuthContext();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const { isError, isLoading } = useAuthQueryHook<
    ReadUserFirstNameAndPictureQuery,
    ReadUserFirstNameAndPictureQueryVariables
  >(
    "ReadUserFirstNameAndPictureOperation",
    ReadUserFirstNameAndPictureOperation,
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

  if (isLoading || isError) {
    return (
      <div className="h-9 w-32 animate-pulse rounded-md bg-neutral-100"></div>
    );
  }

  return (
    <div className="relative">
      <Show when={isOpenLogoutModal}>
        <LogoutModal
          isOpen={isOpenLogoutModal}
          setIsOpen={setIsOpenLogoutModal}
        />
      </Show>
      <Menu>
        {({ open }) => (
          <>
            <MenuButton name={userInfo.firstName} />

            <Show when={open} isAnimation={true}>
              <MenuItems handleLogout={() => setIsOpenLogoutModal(true)} />
            </Show>
          </>
        )}
      </Menu>
    </div>
  );
};

const MenuButton: FC<{ name: string }> = ({ name }) => {
  return (
    <Menu.Button className="flex items-center rounded-md px-3 py-2 hover:bg-neutral-100">
      <Image
        src={defaultData.picture}
        alt="picture"
        width="28"
        height="28"
        className="rounded-full object-cover "
      />
      <p className="max-w-[100px] overflow-hidden text-ellipsis pl-2 font-medium">
        {name}
      </p>
    </Menu.Button>
  );
};

const MenuItems: FC<{ handleLogout: () => void }> = ({ handleLogout }) => {
  const router = useRouter();
  return (
    <Menu.Items
      static
      as={motion.div}
      key="menu"
      initial={{ x: 150 }}
      animate={{ x: 0 }}
      exit={{ x: 150 }}
      className="absolute right-0 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <MenuItem
        text="Account"
        Icon={<CogIcon />}
        onClick={() => router.push("/Account")}
      />
      <MenuItem text="Logout" Icon={<LogoutIcon />} onClick={handleLogout} />
    </Menu.Items>
  );
};

const MenuItem: FC<{ text: string; Icon: ReactNode; onClick: () => void }> = ({
  text,
  Icon,
  onClick,
}) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={clsx(
            active && "bg-neutral-100",
            "flex w-full cursor-pointer items-center px-4 py-2"
          )}
        >
          <div className="text-black-500 mr-2 flex h-7 w-7 items-center justify-center">
            <div className="h-5 w-5 text-neutral-600">{Icon}</div>
          </div>
          <p>{text}</p>
        </button>
      )}
    </Menu.Item>
  );
};

export default AuthNavbarItem;
