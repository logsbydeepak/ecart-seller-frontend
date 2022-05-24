import { NextPageLayoutType } from "~/types/nextMod";
import AccountSideBarLayout from "~/layout/AccountSideBarLayout";
import SideBarContent from "~/components/Sidebar/SideBarContent";

const Account: NextPageLayoutType = () => {
  return <SideBarContent title="Payment"></SideBarContent>;
};

Account.getLayout = AccountSideBarLayout;

export default Account;
