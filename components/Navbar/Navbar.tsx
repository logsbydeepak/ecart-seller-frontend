import Link from "next/link";
import { FC } from "react";
import AuthNavbarItem from "./AuthNavbarItem";
import NoAuthNavbarItem from "./NoAuthNavbarItem";
import ChangeThemeItem from "./ChangeThemeItem";

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
        <div className="flex">
          <div>{auth ? <AuthNavbarItem /> : <NoAuthNavbarItem />}</div>
          <ChangeThemeItem />
        </div>
      </nav>
    </>
  );
};

Navbar.defaultProps = {
  auth: false,
};

export default Navbar;
