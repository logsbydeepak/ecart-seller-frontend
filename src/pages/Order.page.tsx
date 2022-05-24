import AppNavbarLayout from "~/layout/AppNavbar";
import { NextPageLayoutType } from "~/types/nextMod";

const Order: NextPageLayoutType = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Order</h1>
    </>
  );
};

Order.getLayout = AppNavbarLayout;

export default Order;
