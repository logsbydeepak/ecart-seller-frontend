import AppNavbarLayout from "~/layout/AppNavbar";
import { NextPageLayoutType } from "~/types/nextMod";

const Dashboard: NextPageLayoutType = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
    </>
  );
};

Dashboard.getLayout = AppNavbarLayout;

export default Dashboard;
