import Link from "next/link";
import { FC } from "react";
import AuthNavbarItem from "./AuthNavbarItem";
import NoAuthNavbarItem from "./NoAuthNavbarItem";

interface props {
  auth: boolean;
}

const Navbar: FC<props> = ({ auth }) => {
  return (
    <>
      <nav className="flex justify-between p-4">
        <Link href="/">
          <a className="text-lg font-medium">EcartSeller</a>
        </Link>
        {auth ? <AuthNavbarItem /> : <NoAuthNavbarItem />}
      </nav>
    </>
  );
};

Navbar.defaultProps = {
  auth: false,
};

export default Navbar;

// import { useTheme } from "next-themes";

// const Navbar = () => {
//   const { theme, setTheme } = useTheme();
//   return (
//     <>
//       <nav></nav>
//       <h1 className="dark:text-xl">Navbar</h1>
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           setTheme("dark");
//         }}
//       >
//         dark
//       </button>
//       <br />
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           setTheme("light");
//         }}
//       >
//         light
//       </button>
//       <br />
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           setTheme("system");
//         }}
//       >
//         system
//       </button>
//     </>
//   );
// };
