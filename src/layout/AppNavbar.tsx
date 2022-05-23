import AuthLayout from "./AuthLayout";
import { ReactElement, FC, ReactNode, Children } from "react";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import Link from "next/link";
import {
  ClipboardListIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserAddIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { classNames } from "~/utils/helper/tailwind";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import Navbar from "~/components/Navbar";
import ContainerLayout from "./ContainerLayout";

const AppNavbarLayout = (page: ReactElement) => (
  <AuthLayout
    isAuth={true}
    redirect="/Login"
    page={<AppNavigation>{page}</AppNavigation>}
  />
);

const AppNavigation: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname.toLowerCase();
  return (
    <>
      <Navbar />
      <div className="mt-20 flex">
        <div className="inline-block h-screen w-60 ">
          <Item
            url="/Dashboard"
            name="Dashboard"
            icon={<HomeIcon />}
            active={currentPath === "/dashboard"}
          />
          <Item
            url="/Product"
            name="Product"
            icon={<ShoppingBagIcon />}
            active={currentPath === "/product"}
          />
          <Item
            url="/Order"
            name="Order"
            icon={<ClipboardListIcon />}
            active={currentPath === "/order"}
          />
          <Item
            url="/Buyer"
            name="Buyer"
            icon={<UserAddIcon />}
            active={currentPath === "/buyer"}
          />
        </div>
        <div className="ml-20">{children}</div>
      </div>
    </>
  );
};

const Item: FC<{
  url: string;
  name: string;
  icon: ReactNode;
  active: boolean;
}> = ({ url, name, icon, active }) => {
  return (
    <Link href={url}>
      <a
        className={classNames(
          active
            ? "bg-neutral-700 text-white hover:bg-neutral-800"
            : "hover:bg-neutral-100",
          "flex items-center rounded-r-full py-3.5 pl-6 "
        )}
      >
        <div className="mr-4 h-4 w-4">{icon}</div>
        <p>{name}</p>
      </a>
    </Link>
  );
};

export default AppNavbarLayout;
