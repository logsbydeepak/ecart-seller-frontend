import Link from "next/link";
import { FC } from "react";
import AuthNavbarItem from "./AuthNavbarItem";
import NoAuthNavbarItem from "./NoAuthNavbarItem";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { useAuthContext } from "~/context/AuthContext";
import { MenuIcon } from "@heroicons/react/outline";
import Show from "../Show";
import { useSideBarContext } from "~/context/SideBarContext";

interface props {
  auth: boolean;
}

const Navbar: FC = () => {
  const { isAuth } = useAuthContext();
  const { setSideBarIsOpen } = useSideBarContext();

  return (
    <nav className="fixed top-0 z-50 flex h-16 w-full items-center border-b-2 border-gray-100 bg-white">
      <div className="mx-auto my-0 flex w-full  items-center justify-between px-6">
        <div className="flex items-center">
          <Show when={isAuth === true}>
            <button onClick={() => setSideBarIsOpen((preValue) => !preValue)}>
              <MenuIcon className="mr-2 h-5 w-5" />
            </button>
          </Show>
          <Link href={isAuth ? "/Dashboard" : "/"}>
            <a className="flex items-center text-lg">
              <ShoppingCartIcon className="h-6 text-indigo-600" />
              <span className="w-full pl-2 pt-px font-bold">Ecart Seller</span>
            </a>
          </Link>
        </div>
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
