import { RefreshIcon, TrashIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useAuthContext } from "../utils/Context/AuthContext";

const Profile = () => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (!isAuth) {
    router.push("/Login");
    return null;
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

  if (isAuth) {
    router.push("/Login");
    return null;
  }

  const image =
    "https://images.unsplash.com/photo-1637633198300-08beaec68c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80";

  return (
    <>
      <div className="flex  justify-center py-10">
        <div className="">
          {" "}
          <h1 className=" mb-10 pb-4 text-center text-4xl font-bold text-slate-900 dark:text-slate-50">
            {" "}
            Profile{" "}
          </h1>
          <div className="w-98 flex items-center justify-center">
            <img
              src={image}
              alt=""
              className="h-40 w-40 rounded-full border-4 border-indigo-600 object-cover p-1 dark:border-indigo-300"
            />
            <div className="ml-8 flex flex-col justify-between">
              <button className="mb-6 flex items-center rounded-md border-2 border-slate-100 px-4 py-1.5 hover:text-indigo-600 dark:border-neutral-800 dark:hover:text-indigo-400">
                <RefreshIcon className="h-4 pr-2" />
                Change
              </button>
              <button className="flex items-center rounded-md border-2 border-slate-100 px-4 py-1.5 hover:text-indigo-600 dark:border-neutral-800 dark:hover:text-indigo-400">
                <TrashIcon className="h-4 pr-2" />
                Remove
              </button>
            </div>
          </div>
          <form className="my-12 w-96">
            <input
              placeholder="Name"
              type="text"
              id="html"
              value={userInfo.name}
              name="name"
              onChange={handleInputChange}
              className="mb-4 w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-indigo-600 focus:bg-white focus:ring-indigo-400 dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-300"
            />

            <input
              placeholder="Email address"
              type="text"
              id="html"
              value={userInfo.email}
              name="email"
              onChange={handleInputChange}
              className="mb-4 w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-indigo-600 focus:bg-white focus:ring-indigo-400
              dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-400
              dark:focus:border-indigo-400 dark:focus:ring-indigo-300
              "
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
              dark:focus:border-indigo-400 dark:focus:ring-indigo-300
              "
            />
            <button
              type="submit"
              className="mt-8 w-full rounded-md bg-indigo-600 py-3 text-center text-white hover:bg-indigo-500 dark:bg-indigo-400 dark:font-semibold dark:text-black dark:hover:bg-indigo-500"
            >
              Logout All
            </button>
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-red-600 py-3 text-white hover:bg-red-500 dark:bg-red-400 dark:font-semibold dark:text-black dark:hover:bg-red-500"
            >
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
