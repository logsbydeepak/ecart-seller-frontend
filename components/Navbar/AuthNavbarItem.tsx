import { v4 } from "uuid";
import { Menu } from "@headlessui/react";
import { CogIcon, LogoutIcon } from "@heroicons/react/outline";
import { NextRouter, useRouter } from "next/router";
import { classNames } from "../../utils/helper";

const profileOptions = [
  {
    key: v4(),
    name: "Profile",
    icon: <CogIcon />,
    onSelect: (router: NextRouter) => {
      router.push("/Profile");
    },
  },
  {
    key: v4(),
    name: "Logout",
    icon: <LogoutIcon />,
    onSelect: (router: NextRouter) => {
      router.push("/");
    },
  },
];

const AuthNavbarItem = () => {
  const image =
    "https://images.unsplash.com/photo-1637633198300-08beaec68c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80";
  const router = useRouter();
  return (
    <>
      <Menu>
        <Menu.Button>
          <img
            src={image}
            alt="Profile"
            className="inline-block h-8 w-8 rounded-full border-2 border-indigo-600 object-cover p-0.5 dark:border-indigo-300"
          />
        </Menu.Button>

        <Menu.Items className="absolute right-0 top-0 mr-32 mt-16 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800">
          {profileOptions.map((element) => (
            <Menu.Item key={element.key}>
              {({ active }) => (
                <button
                  className={classNames(
                    active && "bg-gray-100 dark:bg-neutral-700",
                    "flex w-full cursor-pointer items-center rounded-md p-3"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    element.onSelect(router);
                  }}
                >
                  <div className="text-black-500 mr-2 ml-2 h-4 w-4">
                    {element.icon}
                  </div>
                  <p>{element.name}</p>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </>
  );
};

export default AuthNavbarItem;
