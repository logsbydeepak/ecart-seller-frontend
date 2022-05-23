import AppNavbarLayout from "~/layout/AppNavbar";
import { NextPageLayoutType } from "~/types/nextMod";

const Buyer: NextPageLayoutType = () => {
  return (
    <>
      <h1>Buyer</h1>
    </>
  );
};

Buyer.getLayout = AppNavbarLayout;

export default Buyer;
