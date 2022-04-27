import { object } from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm, UseFormGetValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmojiHappyIcon, MailIcon } from "@heroicons/react/solid";

import { name, email, password } from "~/utils/validation";
import { useAuthContext } from "~/context/AuthContext";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";
import { useMutation } from "react-query";
import SignUpQuery from "~/utils/gql/User/SignUp.gql";
import { gqlRequest } from "~/utils/helper/gql";
import authPageGuard from "~/utils/helper/authPageGuard";
import { NextPage } from "next";

const schema = object({ name, email, password });
const signUpRequest = (getValues: UseFormGetValues<SignUpFormType>) =>
  gqlRequest(SignUpQuery, getValues());

interface SignUpFormType {
  name: string;
  email: string;
  password: string;
}

const SignUp: NextPage = () => {
  authPageGuard(false, "/App");

  const { setIsAuth } = useAuthContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormType>({ resolver: yupResolver(schema) });

  const { isLoading, mutateAsync } = useMutation(signUpRequest, {
    retry: 3,
  });

  const onSubmit: SubmitHandler<SignUpFormType> = async () => {
    const signUpUser = await mutateAsync(getValues);
    const createUser = signUpUser.createUser;
    const typename = createUser.__typename;

    if (
      createUser.title === "AUTHENTICATION" &&
      createUser.message === "email already exist"
    ) {
      setError("email", { message: createUser.message }, { shouldFocus: true });
    }

    if (typename === "User") {
      setIsAuth(true);
      router.push("/App");
    }
  };

  return (
    <div className="flex flex-col items-center	justify-center py-20">
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
          <fieldset disabled={isLoading}>
            <InputWithLeftIcon
              register={register("name")}
              label="Name"
              errorMessage={errors.name?.message}
              placeholder="seller name"
              Icon={<EmojiHappyIcon />}
            />

            <InputWithLeftIcon
              register={register("email")}
              label="Email"
              className="my-4"
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
              disabled={isLoading}
              className="mt-8 w-full rounded-md bg-indigo-600 py-3 text-white hover:bg-indigo-500 dark:bg-indigo-400 dark:font-semibold dark:text-black dark:hover:bg-indigo-500 dark:disabled:bg-neutral-400"
            >
              SignUp
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
