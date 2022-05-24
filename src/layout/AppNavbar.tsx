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
import {
  ClipboardListIcon as ClipboardListIconSolid,
  HomeIcon as HomeIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  UserAddIcon as UserAddIconSolid,
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
  const { sideBarIsOpen } = useSideBarContext();

  return (
    <>
      <div className="flex pt-20">
        <div
          className={classNames(
            sideBarIsOpen ? "inline-block" : "hidden",
            "h-screen w-60"
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
            icon={<UserAddIcon />}
            solidIcon={<UserAddIconSolid />}
            active={currentPath === "/buyer"}
          />
        </div>
        <div className="mx-auto w-full max-w-screen-2xl px-8 pb-8">
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
