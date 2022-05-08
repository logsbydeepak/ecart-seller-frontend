import { Menu } from "@headlessui/react";
import { CogIcon, LogoutIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Image from "next/image";
import { FC, ReactNode, useState } from "react";
import LogoutModal from "~/components/Modal/LogoutModal";
import DeleteSessionQuery from "~/utils/gql/Session/DeleteSession.gql";
import useAuthRequestHook from "~/hooks/useAuthRequestHook";

const AuthNavbarItem: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refetch } = useAuthRequestHook({
    key: "logout User",
    query: DeleteSessionQuery,
    name: "deleteSession",
    option: { enabled: false },
  });

  const handleLogout = () => {
    setIsOpen(true);
  };

  const image =
    "https://images.unsplash.com/photo-1637633198300-08beaec68c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80";
  const router = useRouter();
  return (
    <Menu>
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

      <Menu.Items className="absolute right-0 top-0 mr-20 mt-16 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <MenuItem
          text="Profile"
          Icon={<CogIcon />}
          onClick={() => router.push("/Profile")}
        />
        <MenuItem text="Logout" Icon={<LogoutIcon />} onClick={handleLogout} />
      </Menu.Items>
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
