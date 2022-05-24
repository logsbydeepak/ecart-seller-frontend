import SideBarContent from "~/components/Sidebar/SideBarContent";
import DashboardSideBarLayout from "~/layout/DashboardSideBarLayout";
import { NextPageLayoutType } from "~/types/nextMod";

const Buyer: NextPageLayoutType = () => {
  return <SideBarContent title="Buyer"></SideBarContent>;
};

Buyer.getLayout = DashboardSideBarLayout;

export default Buyer;
