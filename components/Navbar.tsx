import { useTheme } from "next-themes";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <h1 className="dark:text-xl">Navbar</h1>
      <button
        onClick={(e) => {
          e.preventDefault();
          setTheme("dark");
        }}
      >
        dark
      </button>
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          setTheme("light");
        }}
      >
        light
      </button>
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          setTheme("system");
        }}
      >
        system
      </button>
    </>
  );
};
