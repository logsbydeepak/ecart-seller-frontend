import AuthLayout from "./AuthLayout";
import { ReactElement, FC, ReactNode, Children, useEffect } from "react";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import Link from "next/link";
import {
  ClipboardListIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import {
  ClipboardListIcon as ClipboardListIconSolid,
  HomeIcon as HomeIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  UserCircleIcon as UserCircleIconSolid,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { classNames } from "~/utils/helper/tailwind";
import { useSideBarContext } from "~/context/SideBarContext";
import Show from "~/components/Show";

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
  const { sideBarIsOpen, setSideBarIsOpen } = useSideBarContext();

  useEffect(() => {
    setSideBarIsOpen(true);
  }, [setSideBarIsOpen]);

  return (
    <>
      <div className="flex ">
        <div
          className={classNames(
            sideBarIsOpen ? "inline-block" : "hidden",
            "mr-8 h-screen w-72 pt-20"
          )}
        >
          <Item
            url="/Dashboard"
            name="Dashboard"
            icon={<HomeIcon />}
            solidIcon={<HomeIconSolid />}
            active={currentPath === "/dashboard"}
          />
          <Item
            url="/Product"
            name="Product"
            icon={<ShoppingBagIcon />}
            solidIcon={<ShoppingBagIconSolid />}
            active={currentPath === "/product"}
          />
          <Item
            url="/Order"
            name="Order"
            icon={<ClipboardListIcon />}
            solidIcon={<ClipboardListIconSolid />}
            active={currentPath === "/order"}
          />
          <Item
            url="/Buyer"
            name="Buyer"
            icon={<UserCircleIcon />}
            solidIcon={<UserCircleIconSolid />}
            active={currentPath === "/buyer"}
          />
        </div>
        <div className="mx-auto w-full max-w-screen-2xl px-8 py-20">
          {children}
        </div>
      </div>
    </>
  );
};

const Item: FC<{
  url: string;
  name: string;
  icon: ReactNode;
  solidIcon: ReactNode;
  active: boolean;
}> = ({ url, name, icon, active, solidIcon }) => {
  return (
    <Link href={url}>
      <a
        className={classNames(
          active
            ? "bg-neutral-700 text-white hover:bg-neutral-800"
            : "hover:bg-neutral-100",
          "flex items-center rounded-r-full py-3 pl-6 "
        )}
      >
        <div className="mr-4 h-4 w-4">
          <Show when={!active}>{icon}</Show>
          <Show when={active}>{solidIcon}</Show>
        </div>
        <p className="text-sm">{name}</p>
      </a>
    </Link>
  );
};

export default AppNavbarLayout;
