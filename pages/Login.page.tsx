import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useAuthContext } from "../utils/Context/AuthContext";
import { ArrowSmRightIcon } from "@heroicons/react/outline";
import Link from "next/link";

const Login = () => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (isAuth) {
    router.push("/");
    return <></>;
  }

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    if (["email", "password"].includes(name)) return;

    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <>
      <div className="my-20 flex flex-col	items-center justify-center">
        <div className="rounded-lg border-2 px-10 py-16">
          <h1 className="pb-4 text-center text-4xl font-bold text-slate-900">
            Welcome back
          </h1>
          <p className="mb-8 text-center">
            Don't have an account?
            <Link href="/SignUp">
              <a className="ml-2 text-green-600 hover:text-green-500 hover:underline">
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
              className="mb-4 w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-green-600 focus:bg-white focus:ring-green-400"
            />

            <input
              placeholder="Password"
              type="text"
              id="html"
              value={userInfo.password}
              onChange={handleInputChange}
              name="password"
              className="w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-green-600 focus:bg-white focus:ring-green-400"
            />
            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center rounded-md bg-slate-800 py-3 text-white hover:bg-slate-700"
            >
              Login
              <ArrowSmRightIcon className="h-5 pl-1" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
