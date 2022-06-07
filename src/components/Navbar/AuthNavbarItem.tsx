import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { FC, ReactNode, useState, Fragment } from "react";
import { CogIcon, LogoutIcon } from "@heroicons/react/outline";

import ReadUserQuery from "~/utils/gql/User/ReadUser.gql";
import LogoutModal from "~/components/Modal/LogoutModal";
import useAuthQueryRequestHook from "~/hooks/useAuthQueryRequest";

const defaultData = {
  name: "User Name",
  profile:
    "https://images.unsplash.com/photo-1637633198300-08beaec68c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
};

const AuthNavbarItem: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(defaultData);

  const router = useRouter();

  const onSuccessQuery = (data: any) => {
    const readUser = data.readUser;
    const typename = readUser.__typename;

    if (typename === "User") {
      setUserInfo((preValue) => ({ ...preValue, name: readUser.firstName }));
    }
  };

  const onErrorQuery = () => {};

  const { isSuccess } = useAuthQueryRequestHook({
    key: "Navbar User Info",
    name: "readUser",
    query: ReadUserQuery,
    successTitle: "User",
    onSuccessQuery,
    onErrorQuery,
  });

  const name = userInfo.name;
  const userName = name.length >= 10 ? name.substring(0, 9) + "..." : name;

  if (!isSuccess) return null;

  return (
    <Menu as="div" className="relative">
      <LogoutModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Menu.Button className="flex  items-center rounded-md px-4 py-2 hover:bg-neutral-50">
        <Image
          src={userInfo.profile}
          alt="Profile"
          width="28"
          height="28"
          className="rounded-full object-cover"
        />
        <h1 className="ml-2 block font-medium">{userName}</h1>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-1.5 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem
            text="Account"
            Icon={<CogIcon />}
            onClick={() => router.push("/Account")}
          />
          <MenuItem
            text="Logout"
            Icon={<LogoutIcon />}
            onClick={() => setIsOpen(true)}
          />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const MenuItem: FC<{ text: string; Icon: ReactNode; onClick: () => void }> = ({
  text,
  Icon,
  onClick,
}) => {
  return (
    <Menu.Item
      as="button"
      className="flex w-full cursor-pointer items-center rounded-md px-4 py-2 hover:bg-neutral-50"
      onClick={onClick}
    >
      <div className="text-black-500 mr-2 flex h-7 w-7 items-center justify-center">
        <div className="h-5 w-5 text-neutral-600">{Icon}</div>
      </div>
      <p>{text}</p>
    </Menu.Item>
  );
};

export default AuthNavbarItem;
