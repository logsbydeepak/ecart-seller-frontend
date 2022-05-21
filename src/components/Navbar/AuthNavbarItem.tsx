import { Menu, Transition } from "@headlessui/react";
import { CogIcon, LogoutIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Image from "next/image";
import { FC, ReactNode, useState, Fragment } from "react";
import LogoutModal from "~/components/Modal/LogoutModal";
import DeleteSessionQuery from "~/utils/gql/Session/DeleteSession.gql";
import useAuthRequestHook from "~/hooks/useAuthRequestHook";
import { useAuthContext } from "~/context/AuthContext";

const AuthNavbarItem: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsAuth } = useAuthContext();

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

  const image =
    "https://images.unsplash.com/photo-1637633198300-08beaec68c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80";
  const router = useRouter();
  return (
    <Menu as="div" className="relative">
      <LogoutModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Menu.Button className="inline-block h-8 w-8 rounded-full border-2 border-neutral-300 p-0.5 hover:border-indigo-600">
        <Image
          src={image}
          alt="Profile"
          width="32"
          height="32"
          className="rounded-full object-cover"
        />
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
        <Menu.Items className="absolute right-0 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
