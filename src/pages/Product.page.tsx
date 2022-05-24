import SideBarContent from "~/components/Sidebar/SideBarContent";
import DashboardSideBarLayout from "~/layout/DashboardSideBarLayout";
import { NextPageLayoutType } from "~/types/nextMod";

const Product: NextPageLayoutType = () => {
  return <SideBarContent title="Product"></SideBarContent>;
};

Product.getLayout = DashboardSideBarLayout;

export default Product;
