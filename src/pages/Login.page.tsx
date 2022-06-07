import { object } from "yup";
import Link from "next/link";
import { useState } from "react";
import { MailIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, UseFormGetValues } from "react-hook-form";

import AuthLayout from "~/layout/AuthLayout";
import { gqlRequest } from "~/utils/helper/gql";
import { NextPageLayoutType } from "~/types/nextMod";
import { email, password } from "~/utils/validation";
import { useAuthContext } from "~/context/AuthContext";
import ContainerLayout from "~/layout/ContainerLayout";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import CreateSessionQuery from "~/utils/gql/Session/CreateSession.gql";
import ButtonWithTextAndSpinner from "~/components/Button/ButtonWithTextAndSpinner";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

interface FormType {
  email: string;
  password: string;
}

const fromValidationSchema = object({ email, password });

const errorMessage = {
  message: "email or password is invalid",
  shouldFocus: true,
};

const createSessionRequest = (getValues: UseFormGetValues<FormType>) =>
  gqlRequest({ query: CreateSessionQuery, variable: getValues() });

const Login: NextPageLayoutType = () => {
  const { setAuthToken } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: yupResolver(fromValidationSchema) });

  const onSubmit: SubmitHandler<FormType> = async () => {
    try {
      setIsLoading(true);

      const request = await createSessionRequest(getValues);
      const data = request.createSession;

      if (data.__typename === "Token") {
        setAuthToken(data.token);
        return;
      }

      const title = data.title;

      if (["BODY_PARSE", "AUTHENTICATION"].includes(title)) {
        setIsLoading(false);
        setError("email", errorMessage);
        setError("password", errorMessage);
        return;
      }
      throw { message: "Something went wrong" };
    } catch (error) {
      setIsLoading(false);
    }
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

Login.getLayout = (page) => (
  <ContainerLayout>
    <AuthLayout page={page} isAuth={false} redirect="/Dashboard" />
  </ContainerLayout>
);

export default Login;
