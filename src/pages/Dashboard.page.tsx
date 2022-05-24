import AppNavbarLayout from "~/layout/AppNavbar";
import { NextPageLayoutType } from "~/types/nextMod";

const Dashboard: NextPageLayoutType = () => {
  return (
    <>
      <div className="w-full bg-red-600">
        <h1>Dashboard</h1>
      </div>
    </>
  );
};

Dashboard.getLayout = AppNavbarLayout;

export default Dashboard;
