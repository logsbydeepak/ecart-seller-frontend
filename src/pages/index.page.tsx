import Link from "next/link";
import { ArrowSmRightIcon } from "@heroicons/react/outline";

import { NextPageLayoutType } from "~/types/nextMod";
import AuthLayout from "~/layout/AuthLayout";

const Home: NextPageLayoutType = () => {
  return (
    <div className="py-40">
      <h1 className="text-center text-7xl font-semibold leading-snug">
        Sell your product and <br />
        increase sales
      </h1>
      <div className="flex justify-center pt-10">
        <Link href="/SignUp">
          <a className="inline-flex items-center rounded-md border-2 border-slate-100  px-10 py-4 text-xl font-semibold hover:text-indigo-600">
            Get Started
            <ArrowSmRightIcon className="h-6 pl-2" />
          </a>
        </Link>
      </div>
    </div>
  );
};

Home.getLayout = (page) => (
  <AuthLayout page={page} authShouldBe={false} redirectTo="/App" />
);

export default Home;
