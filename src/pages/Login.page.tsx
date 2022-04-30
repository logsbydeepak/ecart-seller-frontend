import { object } from "yup";
import Link from "next/link";
import { NextPage } from "next";
import { MailIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm, UseFormGetValues } from "react-hook-form";

import { email, password } from "~/utils/validation";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";
import { useMutation, useQuery } from "react-query";
import authPageGuard from "~/utils/helper/authPageGuard";
import LoginQuery from "~/utils/gql/User/Login.gql";
import { gqlRequest } from "~/utils/helper/gql";
import { useRouter } from "next/router";
import { useAuthContext } from "~/context/AuthContext";

interface LoginInputType {
  email: string;
  password: string;
}

const schema = object({ email, password });

const loginRequest = (getValues: UseFormGetValues<LoginInputType>) =>
  gqlRequest(LoginQuery, getValues());

const Login: NextPage = () => {
  authPageGuard(false, "/App");

  const { setIsAuth } = useAuthContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<LoginInputType>({ resolver: yupResolver(schema) });

  const { isLoading, mutateAsync } = useMutation(loginRequest, {
    retry: 3,
  });

  const onSubmit: SubmitHandler<LoginInputType> = async () => {
    const createSession = await mutateAsync(getValues);
    const typename = createSession.createSession.__typename;

    if (typename === "ErrorResponse") {
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
      setIsAuth(true);
      router.push("/App");
    }
  };

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
                className="mt-8 w-full rounded-md bg-indigo-600 py-3 text-white hover:bg-indigo-500"
              >
                Login
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
