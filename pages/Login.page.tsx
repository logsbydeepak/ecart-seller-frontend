import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useAuthContext } from "../utils/Context/AuthContext";
import Link from "next/link";

const Login = () => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (isAuth) {
    router.push("/App");
    return null;
  }

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    if (!["email", "password"].includes(name)) return;

    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <>
      <div className="my-20 flex flex-col	items-center justify-center">
        <div className="rounded-lg border-2 px-10 py-16 dark:border-neutral-800">
          <h1 className="pb-4 text-center text-4xl font-bold text-slate-900 dark:text-slate-50 ">
            Welcome back
          </h1>
          <p className="mb-8 text-center">
            Don't have an account?
            <Link href="/SignUp">
              <a className="ml-2 text-indigo-600 hover:text-indigo-500 hover:underline dark:text-indigo-300 dark:hover:text-indigo-400">
                SignUp
              </a>
            </Link>
          </p>
          <form className="w-96">
            <input
              placeholder="Email address"
              type="text"
              id="html"
              value={userInfo.email}
              name="email"
              onChange={handleInputChange}
              className="mb-4 w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-indigo-600 focus:bg-white focus:ring-indigo-400
              dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-400
              dark:focus:border-indigo-400 dark:focus:ring-indigo-300"
            />

            <input
              placeholder="Password"
              type="text"
              id="html"
              value={userInfo.password}
              onChange={handleInputChange}
              name="password"
              className="w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-indigo-600 focus:bg-white focus:ring-indigo-400
              dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-400
              dark:focus:border-indigo-400 dark:focus:ring-indigo-300"
            />

            <button
              type="submit"
              className="mt-8 w-full rounded-md bg-indigo-600 py-3 text-white hover:bg-indigo-500 dark:bg-indigo-400 dark:font-semibold dark:text-black dark:hover:bg-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
