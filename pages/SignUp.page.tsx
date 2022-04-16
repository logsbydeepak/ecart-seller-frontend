import { object } from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { name, email, password } from "../utils/validation";
import { useAuthContext } from "../utils/Context/AuthContext";
import { IconInput, IconPasswordInput } from "../components/Input";
import {
  EmojiHappyIcon,
  LockClosedIcon,
  MailIcon,
} from "@heroicons/react/solid";

const schema = object({ name, email, password });

const SignUp = () => {
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
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
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
              <a className="ml-2 text-indigo-600 hover:text-indigo-500 hover:underline dark:text-indigo-300 dark:hover:text-indigo-400">
                Login
              </a>
            </Link>
          </p>
          <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
            <IconInput
              register={register("name")}
              label="Name"
              errorMessage={errors.name?.message}
              placeholder="seller name"
              Icon={<EmojiHappyIcon />}
            />

            <IconInput
              register={register("email")}
              label="Email"
              className="my-4"
              errorMessage={errors.email?.message}
              placeholder="example@abc.com"
              Icon={<MailIcon />}
            />

            <IconPasswordInput
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
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
