import { object } from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { email, password } from "../utils/validation";
import { useAuthContext } from "../utils/Context/AuthContext";
import { LockClosedIcon, MailIcon } from "@heroicons/react/solid";
import InputWithLeftIcon from "../components/Input/InputWithLeftIcon";
import PasswordInputWithLeftIcon from "../components/Input/PasswordInputWithLeftIcon";
import { NextPage } from "next";

interface LoginInputType {
  email: string;
  password: string;
}

const schema = object({ email, password });

const Login: NextPage = () => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (isAuth) {
    router.push("/App");
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<LoginInputType> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center	justify-center py-20">
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
          <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
            <InputWithLeftIcon
              register={register("email")}
              label="Email"
              errorMessage={errors.email?.message}
              placeholder="example@abc.com"
              Icon={<MailIcon />}
            />

            <PasswordInputWithLeftIcon
              register={register("password")}
              className="mt-4"
              label="Password"
              type="password"
              errorMessage={errors.password?.message}
              placeholder="strong password"
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
