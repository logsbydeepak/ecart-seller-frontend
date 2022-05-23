import AppNavbarLayout from "~/layout/AppNavbar";
import AuthLayout from "~/layout/AuthLayout";
import { NextPageLayoutType } from "~/types/nextMod";

const App: NextPageLayoutType = () => {
  return (
    <>
      <h1>App</h1>
    </>
  );
};

App.getLayout = AppNavbarLayout;

export default App;
