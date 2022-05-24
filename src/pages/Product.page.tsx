import DashboardSideBarLayout from "~/layout/DashboardSideBarLayout";
import { NextPageLayoutType } from "~/types/nextMod";

const Product: NextPageLayoutType = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Product</h1>
    </>
  );
};

Product.getLayout = DashboardSideBarLayout;

export default Product;
