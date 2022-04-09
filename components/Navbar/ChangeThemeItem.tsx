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
      <Menu as="div" className="relative text-left">
        <Menu.Button className="block h-6 w-6 text-violet-600">
          {theme === "dark" && themeOption[0].icon}
          {theme === "light" && themeOption[1].icon}
          {theme === "system" && themeOption[2].icon}
        </Menu.Button>

        <Menu.Items className="absolute right-0 mt-5 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {themeOption.map((element) => (
            <Menu.Item key={element.key}>
              {({ active }) => (
                <button
                  className={`${active && "bg-gray-100 text-gray-900"} ${
                    theme === element.name.toLocaleLowerCase() &&
                    "text-violet-600"
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
