import Link from "next/link";
import { ArrowSmRightIcon } from "@heroicons/react/outline";

const NoAuthNavbarItem = () => {
  return (
    <div className="text-medium flex text-sm">
      <Link href="/Login">
        <a className="mx-4 rounded-md px-5 py-2.5 hover:text-indigo-700">
          Login
        </a>
      </Link>
      <Link href="/SignUp">
        <a className="flex items-center rounded-md bg-indigo-600 px-5 py-2.5  text-white hover:bg-indigo-700">
          Sign up
          <ArrowSmRightIcon className="ml-1 h-5" />
        </a>
      </Link>
    </div>
  );
};
export default NoAuthNavbarItem;
