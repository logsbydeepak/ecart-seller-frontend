import DashboardSideBarLayout from "~/layout/DashboardSideBarLayout";
import { NextPageLayoutType } from "~/types/nextMod";

const Dashboard: NextPageLayoutType = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
    </>
  );
};

Dashboard.getLayout = DashboardSideBarLayout;

export default Dashboard;
