import {
  CreditCardIcon as CreditCardIconSolid,
  IdentificationIcon as IdentificationIconSolid,
} from "@heroicons/react/solid";

import { FC, ReactElement } from "react";
import { useRouter } from "next/router";
import { CreditCardIcon, IdentificationIcon } from "@heroicons/react/outline";

import AuthLayout from "./AuthLayout";
import SideBarItem from "~/components/Sidebar/SideBarItem";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import SideBarContainer from "~/components/Sidebar/SideBarContainer";

const AccountSideBarLayout = (page: ReactElement) => {
  return (
    <AuthLayout
      page={<AccountSideBar>{page}</AccountSideBar>}
      isAuth={true}
      redirect="/Login"
    />
  );
};

const AccountSideBar: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname.toLowerCase();

  return (
    <SideBarContainer content={children}>
      <SideBarItem
        icon={<IdentificationIcon />}
        solidIcon={<IdentificationIconSolid />}
        name="Account"
        url="/Profile"
        active={currentPath === "/profile"}
      />
      <SideBarItem
        icon={<CreditCardIcon />}
        solidIcon={<CreditCardIconSolid />}
        name="Payment"
        url="/Profile/Payment"
        active={currentPath === "/profile/payment"}
      />
    </SideBarContainer>
  );
};

export default AccountSideBarLayout;
