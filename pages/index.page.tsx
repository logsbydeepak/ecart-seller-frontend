import { ArrowSmRightIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthContext } from "../utils/Context/AuthContext";

const Home: NextPage = () => {
  return (
    <>
      <h1 className="pt-40 text-center text-7xl font-semibold leading-snug">
        Sell your product and <br />
        increase sales
      </h1>
      <div className="flex justify-center pt-10">
        <Link href="/SignUp">
          <a className="inline-flex items-center rounded-md border-2 border-slate-100  px-10 py-4 text-xl font-semibold hover:text-indigo-600 dark:border-neutral-800 dark:text-slate-100 dark:hover:text-indigo-400">
            Get Started
            <ArrowSmRightIcon className="h-6 pl-2" />
          </a>
        </Link>
      </div>
    </>
  );
};

export default Home;
