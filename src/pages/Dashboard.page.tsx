import AppNavbarLayout from "~/layout/AppNavbar";
import { NextPageLayoutType } from "~/types/nextMod";

const Dashboard: NextPageLayoutType = () => {
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

Dashboard.getLayout = AppNavbarLayout;

export default Dashboard;
