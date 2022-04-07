import { useTheme } from "next-themes";
import {
  MoonIcon,
  SunIcon,
  DesktopComputerIcon,
} from "@heroicons/react/outline";
import { Menu } from "@headlessui/react";
import { v4 } from "uuid";

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

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="rounded-full border border-gray-300 bg-white p-2 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            <div className="h-5 w-5">
              {
                themeOption.find(
                  (element) => element.name.toLowerCase() === theme
                )?.icon
              }
            </div>
          </Menu.Button>
        </div>
        <Menu.Items className="absolute right-0 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {themeOption.map((element) => (
            <Menu.Item key={element.key}>
              {({ active }) => (
                <button
                  className={`${
                    active && "bg-gray-100 text-gray-900"
                  } flex w-full cursor-pointer items-center p-3	`}
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
