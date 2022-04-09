import Link from "next/link";
import { FC } from "react";
import AuthNavbarItem from "./AuthNavbarItem";
import NoAuthNavbarItem from "./NoAuthNavbarItem";
import ChangeThemeItem from "./ChangeThemeItem";
import { ShoppingCartIcon } from "@heroicons/react/solid";

interface props {
  auth: boolean;
}

const Navbar: FC<props> = ({ auth }) => {
  return (
    <>
      <nav className="fixed top-0 z-50 flex h-16 w-full items-center border-b-2 border-gray-100 bg-white	">
        <div className="mx-auto my-0 flex w-full max-w-screen-2xl items-center justify-between px-20">
          <Link href="/">
            <a className="flex items-center text-xl">
              <ShoppingCartIcon className="h-6 text-purple-600" />
              <span className="w-full pl-2	pt-px font-nato_sans font-bold text-black">
                Ecart Seller
              </span>
            </a>
          </Link>
          <div className="flex items-center">
            <div className="pr-4">
              {auth ? <AuthNavbarItem /> : <NoAuthNavbarItem />}
            </div>
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
