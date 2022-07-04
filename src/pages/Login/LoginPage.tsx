import { MailIcon } from "@heroicons/react/solid";

import AuthLayout from "~/layout/AuthLayout";
import ContainerLayout from "~/layout/ContainerLayout";

import { NextPageLayoutType } from "~/types/nextMod";

import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import ButtonWithTextAndSpinner from "~/components/Button/ButtonWithTextAndSpinner";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

import useLoginForm from "./hooks/useLoginForm";
import useCreateSessionMutation from "./hooks/useCreateSessionMutation/useCreateSessionMutation";
import LoginAndSignUpContainer from "~/components/container/LoginAndSignUpContainer";

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
    <LoginAndSignUpContainer
      title="Welcome back"
      subTitle="Don't have an account?"
      subTitleLink="/SignUp"
      subTitleLinkText="SignUp"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWithLeftIcon
          disabled={isLoading}
          register={register("email")}
          label="Email"
          errorMessage={errors.email?.message && "email or password is invalid"}
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
    </LoginAndSignUpContainer>
  );
};

LoginPage.getLayout = (page) => (
  <ContainerLayout>
    <AuthLayout page={page} isAuth={false} redirect="/Dashboard" />
  </ContainerLayout>
);

export default LoginPage;
