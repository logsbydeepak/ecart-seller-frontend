import Link from "next/link";
import { FC } from "react";
import AuthNavbarItem from "./AuthNavbarItem";
import NoAuthNavbarItem from "./NoAuthNavbarItem";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { useAuthContext } from "~/context/AuthContext";

interface props {
  auth: boolean;
}

const Navbar: FC = () => {
  const { isAuth } = useAuthContext();
  return (
    <nav className="fixed top-0 z-50 flex h-16 w-full items-center border-b-2 border-gray-100 bg-white">
      <div className="mx-auto my-0 flex w-full max-w-screen-2xl items-center justify-between px-20">
        <Link href={isAuth ? "/Dashboard" : "/"}>
          <a className="flex items-center text-lg">
            <ShoppingCartIcon className="h-6 text-indigo-600" />
            <span className="w-full pl-2 pt-px font-bold">Ecart Seller</span>
          </a>
        </Link>
        <div className="flex items-center">
          <div className="text-sm">
            {isAuth ? <AuthNavbarItem /> : <NoAuthNavbarItem />}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  auth: false,
};

export default Navbar;
