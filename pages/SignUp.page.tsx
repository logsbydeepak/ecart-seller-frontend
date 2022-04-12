import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

import { useAuthContext } from "../utils/Context/AuthContext";

const SignUp = () => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (isAuth) {
    router.push("/");
    return <></>;
  }

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    if (!["name", "email", "password"].includes(name)) return;

    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <>
      <div className="my-20 flex flex-col	items-center justify-center">
        <div className="rounded-lg border-2 px-10 py-16 dark:border-neutral-800">
          <h1 className="pb-4 text-center text-4xl font-bold text-slate-900 dark:text-slate-50  ">
            Create Account
          </h1>
          <p className="mb-8 text-center">
            Already have an account?
            <Link href="/Login">
              <a className="ml-2 text-green-600 hover:text-green-500 hover:underline dark:text-green-400 dark:hover:text-green-500">
                Login
              </a>
            </Link>
          </p>
          <form className="w-96">
            <input
              placeholder="Name"
              type="text"
              id="html"
              value={userInfo.name}
              name="name"
              onChange={handleInputChange}
              className="mb-4 w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-green-600 focus:bg-white focus:ring-green-400 dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-400 dark:focus:border-green-600 dark:focus:ring-green-700"
            />

            <input
              placeholder="Email address"
              type="text"
              id="html"
              value={userInfo.email}
              name="email"
              onChange={handleInputChange}
              className="mb-4 w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-green-600 focus:bg-white focus:ring-green-400
              dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-400
              dark:focus:border-green-600 dark:focus:ring-green-700
              "
            />

            <input
              placeholder="Password"
              type="text"
              id="html"
              value={userInfo.password}
              onChange={handleInputChange}
              name="password"
              className="w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-green-600 focus:bg-white focus:ring-green-400
              dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-400
              dark:focus:border-green-600 dark:focus:ring-green-700
              "
            />
            <button
              type="submit"
              className="mt-8 w-full rounded-md bg-slate-800 py-3 text-white hover:bg-slate-700 dark:bg-slate-300 dark:font-semibold dark:text-black dark:hover:bg-slate-400"
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
