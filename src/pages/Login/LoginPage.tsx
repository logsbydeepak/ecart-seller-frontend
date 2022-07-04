import Link from "next/link";
import { MailIcon } from "@heroicons/react/solid";

import AuthLayout from "~/layout/AuthLayout";
import ContainerLayout from "~/layout/ContainerLayout";

import { NextPageLayoutType } from "~/types/nextMod";

import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import ButtonWithTextAndSpinner from "~/components/Button/ButtonWithTextAndSpinner";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

import useLoginForm from "./hooks/useLoginForm";
import useCreateSessionMutation from "./hooks/useCreateSessionMutation/useCreateSessionMutation";

const LoginPage: NextPageLayoutType = () => {
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  const { mutate, isLoading } = useCreateSessionMutation(setError, getValues);

  const onSubmit = () => {
    mutate();
  };

  return (
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

        <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
          <InputWithLeftIcon
            disabled={isLoading}
            register={register("email")}
            label="Email"
            errorMessage={
              errors.email?.message && "email or password is invalid"
            }
            placeholder="example@abc.com"
            Icon={<MailIcon />}
          />

          <PasswordInputWithLeftIcon
            register={register("password")}
            disabled={isLoading}
            className="mt-4"
            label="Password"
            type="password"
            errorMessage={
              errors.password?.message && "email or password is invalid"
            }
            placeholder="strong password"
          />

          <ButtonWithTextAndSpinner
            text="Login"
            isLoading={isLoading}
            className="mt-8"
          />
        </form>
      </div>
    </div>
  );
};

LoginPage.getLayout = (page) => (
  <ContainerLayout>
    <AuthLayout page={page} isAuth={false} redirect="/Dashboard" />
  </ContainerLayout>
);

export default LoginPage;
