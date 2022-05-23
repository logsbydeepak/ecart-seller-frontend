import { object } from "yup";
import Link from "next/link";
import { useImmer } from "use-immer";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmojiHappyIcon, MailIcon } from "@heroicons/react/solid";
import { SubmitHandler, useForm, UseFormGetValues } from "react-hook-form";

import Show from "~/components/Show";
import AuthLayout from "~/layout/AuthLayout";
import { gqlRequest } from "~/utils/helper/gql";
import { NextPageLayoutType } from "~/types/nextMod";
import SignUpQuery from "~/utils/gql/User/SignUp.gql";
import { useAuthContext } from "~/context/AuthContext";
import { useTokenContext } from "~/context/TokenContext";
import { firstName, lastName, email, password } from "~/utils/validation";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import ButtonWithTextAndSpinner from "~/components/Button/ButtonWithTextAndSpinner";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";
import SimpleInput from "~/components/Input/SimpleInput";
import ContainerLayout from "~/layout/ContainerLayout";

const schema = object({ firstName, lastName, email, password });

const signUpRequest = (getValues: UseFormGetValues<SignUpFormType>) =>
  gqlRequest({ query: SignUpQuery, variable: getValues() });

interface SignUpFormType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUp: NextPageLayoutType = () => {
  const { setIsAuth } = useAuthContext();
  const { setToken } = useTokenContext();

  const [requestStatus, setRequestStatus] = useImmer({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const { isLoading, isSuccess, isError } = requestStatus;

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormType>({ resolver: yupResolver(schema) });

  const onError = () =>
    setRequestStatus((draft) => {
      draft.isError = true;
      draft.isLoading = false;
    });

  const onSuccess = (data: any) => {
    const createUser = data.createUser;
    const typename = createUser.__typename;

    if (
      createUser.title === "AUTHENTICATION" &&
      createUser.message === "email already exist"
    ) {
      setRequestStatus((draft) => {
        draft.isLoading = false;
      });
      setError("email", { message: createUser.message }, { shouldFocus: true });
    }

    if (typename === "AccessToken") {
      setToken(createUser.token);
      setRequestStatus((draft) => {
        draft.isSuccess = true;
      });
      setIsAuth(true);
    }
  };

  const { mutateAsync } = useMutation(signUpRequest, {
    retry: 3,
    onError,
    onSuccess,
  });

  const onSubmit: SubmitHandler<SignUpFormType> = async () => {
    try {
      setRequestStatus((draft) => {
        draft.isLoading = true;
      });
      await mutateAsync(getValues);
    } catch (error) {
      onError();
    }
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

        <Show when={isError}>
          <p className="pb-4 text-center text-red-500">Something went wrong</p>
        </Show>

        <Show when={isSuccess}>
          <p className="pb-4 text-center text-green-500">Login successful</p>
        </Show>

        <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={isLoading}>
            <div className="flex">
              <InputWithLeftIcon
                register={register("firstName")}
                label="First Name"
                errorMessage={errors.firstName?.message}
                placeholder="first name"
                className="mr-4"
                Icon={<EmojiHappyIcon />}
              />

              <SimpleInput
                register={register("lastName")}
                label="Last Name"
                errorMessage={errors.lastName?.message}
                placeholder="last name"
              />
            </div>

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

SignUp.getLayout = (page) => (
  <ContainerLayout>
    <AuthLayout page={page} isAuth={false} redirect="/Dashboard" />
  </ContainerLayout>
);

export default SignUp;
