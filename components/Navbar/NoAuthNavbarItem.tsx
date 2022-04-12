import Link from "next/link";
import { ArrowSmRightIcon } from "@heroicons/react/outline";

const NoAuthNavbarItem = () => {
  return (
    <div className="flex">
      <Link href="/SignUp">
        <a className="mx-4 rounded-md border-2 border-white px-4 py-1.5 hover:text-green-600 dark:border-neutral-900 dark:hover:text-green-400">
          SignUp
        </a>
      </Link>
      <Link href="/Login">
        <a className="flex items-center rounded-md border-2 border-slate-100 px-4 py-1.5 hover:text-green-600 dark:border-neutral-800 dark:hover:text-green-400">
          Login
          <ArrowSmRightIcon className="h-4 pl-1" />
        </a>
      </Link>
    </div>
  );
};
export default NoAuthNavbarItem;
