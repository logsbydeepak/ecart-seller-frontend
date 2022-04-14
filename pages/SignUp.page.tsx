import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuthContext } from "../utils/Context/AuthContext";

const schema = yup.object({
  name: yup.string().trim().required().min(3),
  email: yup.string().trim().lowercase().email().required(),
  password: yup
    .string()
    .trim()
    .required()
    .min(8)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$/,
      "password must container min 1 uppercase, lowercase, number, and symbol"
    ),
});

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
            <input
              placeholder="Name"
              type="text"
              {...register("name")}
              className="w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-indigo-600 focus:bg-white focus:ring-indigo-400 dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-300"
            />
            <p className="mt-1 mb-4 text-sm font-normal text-red-500 dark:text-red-300">
              {errors.name?.message}
            </p>

            <input
              placeholder="Email address"
              type="text"
              {...register("email")}
              className="w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-indigo-600 focus:bg-white focus:ring-indigo-400
              dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-400
              dark:focus:border-indigo-400 dark:focus:ring-indigo-300
              "
            />
            <p className="mt-1 mb-4 text-sm font-normal text-red-500 dark:text-red-300">
              {errors.email?.message}
            </p>

            <input
              placeholder="Password"
              type="text"
              {...register("password")}
              className="w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-indigo-600 focus:bg-white focus:ring-indigo-400
              dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-400
              dark:focus:border-indigo-400 dark:focus:ring-indigo-300
              "
            />

            <p className="mt-1 mb-4 text-sm font-normal text-red-500 dark:text-red-300">
              {errors.password?.message}
            </p>

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
