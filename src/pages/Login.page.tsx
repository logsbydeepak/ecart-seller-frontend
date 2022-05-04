import { object } from "yup";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { MailIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm, UseFormGetValues } from "react-hook-form";

import { gqlRequest } from "~/utils/helper/gql";
import LoginQuery from "~/utils/gql/User/Login.gql";
import { email, password } from "~/utils/validation";
import { useAuthContext } from "~/context/AuthContext";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";
import Spinner from "~/components/Spinner";
import { useState } from "react";

interface LoginInputType {
  email: string;
  password: string;
}

const schema = object({ email, password });

const loginRequest = (getValues: UseFormGetValues<LoginInputType>) =>
  gqlRequest(LoginQuery, getValues());

const Login: NextPage = () => {
  const { isAuth, setIsAuth } = useAuthContext();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<LoginInputType>({ resolver: yupResolver(schema) });

  const { mutateAsync, isError } = useMutation(loginRequest, {
    retry: 3,
  });

  const onSubmit: SubmitHandler<LoginInputType> = async () => {
    setIsLoading(true);
    const createSession = await mutateAsync(getValues);
    const typename = createSession.createSession.__typename;

    if (typename === "ErrorResponse") {
      setIsLoading(false);
      setError(
        "email",
        { message: "invalid email or password" },
        { shouldFocus: true }
      );
      setError(
        "password",
        { message: "invalid email or password" },
        { shouldFocus: true }
      );
    }

    if (typename === "User") {
      setIsSuccess(true);
      setIsAuth(true);
      router.push("/App");
    }
  };

  if (isAuth) {
    router.push("/App");
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center	justify-center py-20">
        <div className="rounded-lg border-2 px-10 py-16 ">
          <h1 className="pb-4 text-center text-4xl font-bold text-slate-900 ">
            Welcome back
          </h1>
          <p className="mb-8 text-center">
            Don&apos;t have an account?
            <Link href="/SignUp">
              <a className="ml-2 text-indigo-600 hover:text-indigo-500 hover:underline">
                SignUp
              </a>
            </Link>
          </p>

          {isError && (
            <p className="pb-4 text-center text-red-500">
              Something went wrong
            </p>
          )}

          {isSuccess && (
            <p className="pb-4 text-center text-green-500">
              User Created Successfully
            </p>
          )}

          <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isLoading}>
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
                className="mt-8 flex h-12 w-full justify-center rounded-md bg-indigo-600 py-3 text-white hover:bg-indigo-500 disabled:bg-neutral-900"
              >
                {isLoading ? <Spinner className="h-5 w-5" /> : "SignUp"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
