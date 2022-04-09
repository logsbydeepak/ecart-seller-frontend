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
      <nav className="flex h-16	 items-center">
        <div className="mx-auto my-0 flex w-full max-w-screen-2xl justify-between px-10">
          <Link href="/">
            <a className="text-lg font-medium">Ecart Seller</a>
          </Link>
          <div className="flex">
            <div>{auth ? <AuthNavbarItem /> : <NoAuthNavbarItem />}</div>
            <ChangeThemeItem />
          </div>
        </div>
      </nav>
    </>
  );
};

Navbar.defaultProps = {
  auth: false,
};

export default Navbar;
