import DashboardSideBarLayout from "~/layout/DashboardSideBarLayout";
import { NextPageLayoutType } from "~/types/nextMod";

const Buyer: NextPageLayoutType = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Buyer</h1>
    </>
  );
};

Buyer.getLayout = DashboardSideBarLayout;

export default Buyer;
