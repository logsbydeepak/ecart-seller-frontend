import SideBarContent from "~/components/Sidebar/SideBarContent";
import DashboardSideBarLayout from "~/layout/DashboardSideBarLayout";
import { NextPageLayoutType } from "~/types/nextMod";

const Dashboard: NextPageLayoutType = () => {
  return <SideBarContent title="Dashboard"></SideBarContent>;
};

Dashboard.getLayout = DashboardSideBarLayout;

export default Dashboard;
