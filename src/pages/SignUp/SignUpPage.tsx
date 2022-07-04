import Link from "next/link";
import { EmojiHappyIcon, MailIcon } from "@heroicons/react/solid";

import AuthLayout from "~/layout/AuthLayout";
import ContainerLayout from "~/layout/ContainerLayout";

import SimpleInput from "~/components/Input/SimpleInput";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import ButtonWithTextAndSpinner from "~/components/Button/ButtonWithTextAndSpinner";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

import { NextPageLayoutType } from "~/types/nextMod";

import useCreateUserMutation from "./hooks/useCreateUserMutation";
import useSignUpForm from "./hooks/useSignUpForm";

const SignUpPage: NextPageLayoutType = () => {
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useSignUpForm();

  const { isLoading, mutate } = useCreateUserMutation(setError, getValues);

  const onSubmit = () => {
    mutate();
  };

  return (
    <div className="flex flex-col items-center	justify-center py-20">
      <div className="rounded-lg border-2 px-10 py-16">
        <h1 className="pb-4 text-center text-4xl font-bold text-slate-900">
          Create Account
        </h1>
        <p className="mb-8 text-center">
          Already have an account?
          <Link href="/Login">
            <a className="ml-2 text-indigo-600 hover:text-indigo-500 hover:underline">
              Login
            </a>
          </Link>
        </p>

        <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={isLoading}>
            <div className="flex">
              <InputWithLeftIcon
                label="First Name"
                disabled={isLoading}
                register={register("firstName")}
                errorMessage={errors.firstName?.message}
                placeholder="first name"
                className="mr-4"
                Icon={<EmojiHappyIcon />}
              />

              <SimpleInput
                label="Last Name"
                disabled={isLoading}
                register={register("lastName")}
                errorMessage={errors.lastName?.message}
                placeholder="last name"
              />
            </div>

            <InputWithLeftIcon
              register={register("email")}
              errorMessage={errors.email?.message}
              label="Email"
              disabled={isLoading}
              className="my-4"
              placeholder="example@abc.com"
              Icon={<MailIcon />}
            />

            <PasswordInputWithLeftIcon
              className="mt-4"
              register={register("password")}
              errorMessage={errors.password?.message}
              disabled={isLoading}
              label="Password"
              type="password"
              placeholder="strong password"
            />

            <PasswordInputWithLeftIcon
              register={register("confirmPassword")}
              errorMessage={errors.confirmPassword?.message}
              className="mt-4"
              label="Confirm Password"
              type="password"
              disabled={isLoading}
              placeholder="retype password"
            />

            <ButtonWithTextAndSpinner
              text="SignUp"
              isLoading={isLoading}
              className="mt-8"
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

SignUpPage.getLayout = (page) => (
  <ContainerLayout>
    <AuthLayout page={page} isAuth={false} redirect="/Dashboard" />
  </ContainerLayout>
);

export default SignUpPage;
