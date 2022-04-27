import { useTheme } from "next-themes";
import {
  MoonIcon,
  SunIcon,
  DesktopComputerIcon,
} from "@heroicons/react/outline";
import { Menu } from "@headlessui/react";
import { v4 } from "uuid";
import { useMemo } from "react";
import { classNames } from "~/utils/helper/tailwind";

const themeOption = [
  {
    key: v4(),
    name: "Dark",
    icon: <MoonIcon />,
  },
  {
    key: v4(),
    name: "Light",
    icon: <SunIcon />,
  },
  {
    key: v4(),
    name: "System",
    icon: <DesktopComputerIcon />,
  },
];

const ChangeThemeItem = () => {
  const { theme, setTheme } = useTheme();

  const currentThemeIconMemo = useMemo(
    () =>
      themeOption.find((element) => element.name.toLowerCase() === theme)?.icon,
    [theme]
  );

  return (
    <>
      <Menu as="div">
        <Menu.Button className="block h-5 w-5 text-indigo-600 dark:text-indigo-300">
          {currentThemeIconMemo}
        </Menu.Button>

        <Menu.Items className="absolute right-0 top-0 mt-16 mr-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800">
          {themeOption.map((element) => (
            <Menu.Item key={element.key}>
              {({ active }) => (
                <button
                  className={classNames(
                    active && "bg-gray-100 dark:bg-neutral-700",
                    theme === element.name.toLocaleLowerCase() &&
                      "text-indigo-600 dark:text-indigo-300",
                    "flex w-full cursor-pointer items-center rounded-md p-3"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    setTheme(element.name.toLowerCase());
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

export default ChangeThemeItem;
