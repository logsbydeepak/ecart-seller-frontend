import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import { ReactNode, useState } from "react";
import { CogIcon, LogoutIcon } from "@heroicons/react/outline";

import Show from "~/components/Show";

import LogoutModal from "~/pages/App/components/LogoutModal";
import useReadUserFirstNameAndPictureQuery from "./useReadUserFirstNameAndPictureQuery";

const AuthNavbarItem = () => {
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const [userInfo, setUserInfo] = useState(
    null as unknown as { firstName: string; picture: string }
  );

  const { isLoading, isError } =
    useReadUserFirstNameAndPictureQuery(setUserInfo);

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
            <MenuButton name={userInfo.firstName} picture={userInfo.picture} />

            <Show when={open} isAnimation={true}>
              <MenuItems handleLogout={() => setIsOpenLogoutModal(true)} />
            </Show>
          </>
        )}
      </Menu>
    </div>
  );
};

const MenuButton = ({ name, picture }: { name: string; picture: string }) => {
  return (
    <Menu.Button className="flex items-center rounded-md px-3 py-2 hover:bg-neutral-100">
      <Image
        src={picture}
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

const MenuItems = ({ handleLogout }: { handleLogout: () => void }) => {
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

const MenuItem = ({
  text,
  Icon,
  onClick,
}: {
  text: string;
  Icon: ReactNode;
  onClick: () => void;
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
