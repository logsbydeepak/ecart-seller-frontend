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

import AuthLayout from "./AuthLayout";
import { ReactElement, FC } from "react";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";

import { useRouter } from "next/router";
import SideBarItem from "~/components/Sidebar/SideBarItem";
import SideBarContainer from "~/components/Sidebar/SideBarContainer";

const DashboardSideBarLayout = (page: ReactElement) => (
  <AuthLayout
    isAuth={true}
    redirect="/Login"
    page={<DashboardSideBar>{page}</DashboardSideBar>}
  />
);

const DashboardSideBar: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname.toLowerCase();

  return (
    <SideBarContainer content={children}>
      <SideBarItem
        url="/Dashboard"
        name="Dashboard"
        icon={<HomeIcon />}
        solidIcon={<HomeIconSolid />}
        active={currentPath === "/dashboard"}
      />
      <SideBarItem
        url="/Product"
        name="Product"
        icon={<ShoppingBagIcon />}
        solidIcon={<ShoppingBagIconSolid />}
        active={currentPath === "/product"}
      />
      <SideBarItem
        url="/Order"
        name="Order"
        icon={<ClipboardListIcon />}
        solidIcon={<ClipboardListIconSolid />}
        active={currentPath === "/order"}
      />
      <SideBarItem
        url="/Buyer"
        name="Buyer"
        icon={<UserCircleIcon />}
        solidIcon={<UserCircleIconSolid />}
        active={currentPath === "/buyer"}
      />
    </SideBarContainer>
  );
};

export default DashboardSideBarLayout;
