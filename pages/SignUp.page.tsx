import { useRouter } from "next/router";
import { ChangeEvent, useId, useInsertionEffect, useState } from "react";
import { useAuthContext } from "../utils/Context/AuthContext";
import handler from "./api/hello";

const SignUp = () => {
  const { isAuth } = useAuthContext();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (isAuth) {
    router.push("/");
    return <></>;
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name !== "name" && name !== "password" && name !== "email") {
      return;
    }

    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <>
      <div className="my-20 flex flex-col	items-center justify-center">
        <div className="rounded-lg border-2 px-10 py-16">
          <h1 className="pb-12 text-center text-4xl font-bold">SignUp User</h1>
          <form className="w-96">
            <input
              placeholder="Name"
              type="text"
              name="name"
              id="html"
              value={userInfo.name}
              onChange={handleInputChange}
              className="w-full rounded-md border-2 border-slate-100 text-base ring-0 focus:border-green-600 focus:ring-green-400"
            />

            <input
              placeholder="Email address"
              type="text"
              id="html"
              value={userInfo.email}
              name="email"
              onChange={handleInputChange}
              className="my-4 w-full rounded-md border-2 border-slate-100 text-base ring-0 focus:border-green-600 focus:ring-green-400"
            />

            <input
              placeholder="Password"
              type="text"
              id="html"
              value={userInfo.password}
              onChange={handleInputChange}
              name="password"
              className="w-full rounded-md border-2 border-slate-100 text-base ring-0 focus:border-green-600 focus:ring-green-400"
            />
            <button
              type="submit"
              className="mt-8 w-full rounded-md bg-slate-800 py-3 text-white hover:bg-slate-700"
            >
              CreateAccount
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
