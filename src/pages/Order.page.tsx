import DashboardSideBarLayout from "~/layout/DashboardSideBarLayout";
import { NextPageLayoutType } from "~/types/nextMod";

const Order: NextPageLayoutType = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Order</h1>
    </>
  );
};

Order.getLayout = DashboardSideBarLayout;

export default Order;
