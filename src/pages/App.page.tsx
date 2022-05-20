import AuthLayout from "~/layout/AuthLayout";
import { NextPageLayoutType } from "~/types/nextMod";

const App: NextPageLayoutType = () => {
  return (
    <>
      <h1>App</h1>
    </>
  );
};

App.getLayout = (page) => (
  <AuthLayout page={page} isAuth={true} redirect="/Login" />
);

export default App;
