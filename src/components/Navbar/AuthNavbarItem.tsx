import { Menu, Transition } from "@headlessui/react";
import { CogIcon, LogoutIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Image from "next/image";
import { FC, ReactNode, useState, Fragment } from "react";
import LogoutModal from "~/components/Modal/LogoutModal";
import DeleteSessionQuery from "~/utils/gql/Session/DeleteSession.gql";
import useAuthRequestHook from "~/hooks/useAuthRequestHook";
import { useAuthContext } from "~/context/AuthContext";
import { useUserContext } from "~/context/UserContext";
import GetUserQuery from "~/utils/gql/User/GetUser.gql";

const AuthNavbarItem: FC = () => {
  const { setIsAuth } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, setUserInfo } = useUserContext();

  const router = useRouter();

  const onSuccessUser = (data: any) => {
    const readUser = data.readUser;
    const typename = readUser.__typename;

    if (typename === "User") {
      setUserInfo((preValue) => ({ ...preValue, name: readUser.name }));
    }
  };

  const { isSuccess } = useAuthRequestHook({
    key: "Navbar User Info",
    name: "readUser",
    query: GetUserQuery,
    option: {
      onSuccess: onSuccessUser,
    },
  });

  const onSuccess = () => {
    setIsOpen(false);
    setIsAuth(false);
  };

  const onError = () => {
    setIsOpen(false);
  };

  const { refetch } = useAuthRequestHook({
    key: "logout User",
    query: DeleteSessionQuery,
    name: "deleteSession",
    option: { enabled: false, onSuccess, onError },
  });

  const handleLogout = async () => {
    setIsOpen(true);
    await refetch();
  };

  const name = userInfo.name;
  const userName = name.length >= 10 ? name.substring(0, 9) + "..." : name;

  if (!isSuccess) return null;

  return (
    <Menu as="div" className="relative">
      <LogoutModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Menu.Button className="flex items-center rounded-md border-2 border-neutral-100 px-4 py-2 hover:bg-neutral-50">
        <Image
          src={userInfo.profile}
          alt="Profile"
          width="28"
          height="28"
          className="rounded-full object-cover"
        />
        <h1 className="ml-2 block  font-semibold text-neutral-500">
          {userName}
        </h1>
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
        <Menu.Items className="absolute right-0 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem
            text="Profile"
            Icon={<CogIcon />}
            onClick={() => router.push("/Profile")}
          />
          <MenuItem
            text="Logout"
            Icon={<LogoutIcon />}
            onClick={handleLogout}
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
      className="flex w-full cursor-pointer items-center rounded-md p-3 hover:bg-neutral-50"
      onClick={onClick}
    >
      <div className="text-black-500 mr-2 ml-2 h-4 w-4">{Icon}</div>
      <p>{text}</p>
    </Menu.Item>
  );
};

export default AuthNavbarItem;
