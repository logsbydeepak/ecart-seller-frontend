import { object } from "yup";
import Link from "next/link";
import { useMutation } from "react-query";
import { MailIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, UseFormGetValues } from "react-hook-form";

import AuthLayout from "~/layout/AuthLayout";
import ContainerLayout from "~/layout/ContainerLayout";

import { NextPageLayoutType } from "~/types/nextMod";
import { CreateSessionMutation } from "~/types/graphql";

import { gqlRequest } from "~/utils/helper/gql";
import { email, password } from "~/utils/validation";
import CreateSessionQuery from "~/utils/gql/Session/CreateSession.gql";

import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import ButtonWithTextAndSpinner from "~/components/Button/ButtonWithTextAndSpinner";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

interface FormType {
  email: string;
  password: string;
}

const fromValidationSchema = object({ email, password });

const createSessionRequest = async (getValues: UseFormGetValues<FormType>) => {
  try {
    return (await gqlRequest({
      query: CreateSessionQuery,
      variable: getValues(),
    })) as CreateSessionMutation;
  } catch (error) {
    throw { message: "Something went wrong" };
  }
};

const useFormDate = () =>
  useForm<FormType>({ resolver: yupResolver(fromValidationSchema) });

const errorMessage = {
  message: "email or password is invalid",
  shouldFocus: true,
};

const Login: NextPageLayoutType = () => {
  const { setAuthToken } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useFormDate();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const { isLoading, mutate } = useMutation(createSessionRequest, {
    mutationKey: "createUser",
    retry: 3,
    onError: () => errorNotification(),
    onSuccess: (data) => {
      if (!data) return errorNotification();

      const responseData = data.createSession;

      switch (responseData.__typename) {
        case "Token":
          setAuthToken(responseData.token);
          addNotification("success", "User login successful");
          break;

        case "CreateSessionCredentialError":
          setError("email", errorMessage);
          setError("password", errorMessage);
          break;

        default:
          errorNotification();
      }
    },
  });

  const onSubmit: SubmitHandler<FormType> = async () => {
    mutate(getValues);
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
