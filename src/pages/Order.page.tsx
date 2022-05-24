import SideBarContent from "~/components/Sidebar/SideBarContent";
import DashboardSideBarLayout from "~/layout/DashboardSideBarLayout";
import { NextPageLayoutType } from "~/types/nextMod";

const Order: NextPageLayoutType = () => {
  return <SideBarContent title="Order"></SideBarContent>;
};

Order.getLayout = DashboardSideBarLayout;

export default Order;
