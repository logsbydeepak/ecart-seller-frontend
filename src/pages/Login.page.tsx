import { object } from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import { useImmer } from "use-immer";
import { useMutation } from "react-query";
import { MailIcon } from "@heroicons/react/solid";

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

interface LoginFormType {
  email: string;
  password: string;
}

const validationSchema = object({ email, password });

const initialValues: LoginFormType = {
  email: "",
  password: "",
};

const loginRequest = (variable: LoginFormType) =>
  gqlRequest({ query: LoginQuery, variable });

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
      setErrors({ email: "email or password is invalid" });
      setErrors({ password: "email or password is invalid" });
    }
  };

  const { mutateAsync } = useMutation(loginRequest, {
    retry: 3,
    onError,
    onSuccess,
  });

  const onSubmit = (value: LoginFormType) => {
    try {
      setRequestStatus((draft) => {
        draft.isLoading = true;
      });
      mutateAsync(value);
    } catch (error) {
      onError();
    }
  };

  const { errors, handleSubmit, touched, getFieldProps, setErrors } =
    useFormik<LoginFormType>({
      initialValues,
      validationSchema,
      onSubmit,
    });

  const errorMessage = (key: keyof LoginFormType) =>
    errors[key] && touched[key] && errors[key];

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

        <form className="w-96" onSubmit={handleSubmit}>
          <fieldset disabled={isLoading}>
            <InputWithLeftIcon
              getFieldProps={getFieldProps("email")}
              label="Email"
              errorMessage={errorMessage("email")}
              placeholder="example@abc.com"
              Icon={<MailIcon />}
            />

            <PasswordInputWithLeftIcon
              getFieldProps={getFieldProps("password")}
              className="mt-4"
              label="Password"
              type="password"
              errorMessage={errorMessage("password")}
              placeholder="strong password"
            />

            <ButtonWithTextAndSpinner
              text="Login"
              isLoading={isLoading}
              className="mt-8"
            />
          </fieldset>
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
