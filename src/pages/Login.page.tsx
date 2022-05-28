import { object } from "yup";
import Link from "next/link";
import { useImmer } from "use-immer";
import { useMutation } from "react-query";
import { MailIcon } from "@heroicons/react/solid";
import { useForm, SubmitHandler, UseFormGetValues } from "react-hook-form";

import Show from "~/components/Show";
import AuthLayout from "~/layout/AuthLayout";
import { gqlRequest } from "~/utils/helper/gql";
import LoginQuery from "~/utils/gql/User/Login.gql";
import { NextPageLayoutType } from "~/types/nextMod";
import { email, password } from "~/utils/validation";
import { useAuthContext } from "~/context/AuthContext";
import ContainerLayout from "~/layout/ContainerLayout";
import { useTokenContext } from "~/context/TokenContext";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";
import ButtonWithTextAndSpinner from "~/components/Button/ButtonWithTextAndSpinner";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginFormType {
  email: string;
  password: string;
}

const schema = object({ email, password });

const loginRequest = (getValues: UseFormGetValues<LoginFormType>) =>
  gqlRequest({ query: LoginQuery, variable: getValues() });

const Login: NextPageLayoutType = () => {
  const { setIsAuth } = useAuthContext();
  const { setToken } = useTokenContext();

  const [requestStatus, setRequestStatus] = useImmer({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const { isLoading, isSuccess, isError } = requestStatus;

  const onError = () =>
    setRequestStatus((draft) => {
      draft.isError = true;
      draft.isLoading = false;
    });

  const onSuccess = (data: any) => {
    const createSession = data.createSession;
    const typename = createSession.__typename;

    if (typename === "AccessToken") {
      setToken(createSession.token);
      setRequestStatus((draft) => {
        draft.isSuccess = true;
      });
      setIsAuth(true);
    } else {
      setRequestStatus((draft) => {
        draft.isLoading = false;
      });
      setError(
        "email",
        { message: "email or password is invalid" },
        { shouldFocus: true }
      );
      setError(
        "password",
        { message: "email or password is invalid" },
        { shouldFocus: true }
      );
    }
  };

  const { mutateAsync } = useMutation(loginRequest, {
    retry: 3,
    onError,
    onSuccess,
  });

  const onSubmit: SubmitHandler<LoginFormType> = async () => {
    try {
      setRequestStatus((draft) => {
        draft.isLoading = true;
      });
      mutateAsync(getValues);
    } catch (error) {
      onError();
    }
  };

  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({ resolver: yupResolver(schema) });

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

        <Show when={isError}>
          <p className="pb-4 text-center text-red-500">Something went wrong</p>
        </Show>

        <Show when={isSuccess}>
          <p className="pb-4 text-center text-green-500">
            User Created Successfully
          </p>
        </Show>

        <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
          <InputWithLeftIcon
            disabled={isLoading}
            register={register("email")}
            label="Email"
            errorMessage={errors.email?.message}
            placeholder="example@abc.com"
            Icon={<MailIcon />}
          />

          <PasswordInputWithLeftIcon
            register={register("password")}
            disabled={isLoading}
            className="mt-4"
            label="Password"
            type="password"
            errorMessage={errors.password?.message}
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
