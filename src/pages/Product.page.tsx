import AppNavbarLayout from "~/layout/AppNavbar";
import { NextPageLayoutType } from "~/types/nextMod";

const Product: NextPageLayoutType = () => {
  return (
    <>
      <h1>Product</h1>
    </>
  );
};

Product.getLayout = AppNavbarLayout;

export default Product;
