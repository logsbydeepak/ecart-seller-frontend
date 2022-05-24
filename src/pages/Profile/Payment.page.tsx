import { NextPageLayoutType } from "~/types/nextMod";
import AccountSideBarLayout from "~/layout/AccountSideBarLayout";

const Account: NextPageLayoutType = () => {
  return <>Payment</>;
};

Account.getLayout = AccountSideBarLayout;

export default Account;
