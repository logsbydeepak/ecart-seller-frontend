import Link from "next/link";
import { object, ref } from "yup";
import { useImmer } from "use-immer";
import { useMutation } from "react-query";
import { useForm, SubmitHandler, UseFormGetValues } from "react-hook-form";
import { EmojiHappyIcon, MailIcon } from "@heroicons/react/solid";

import Show from "~/components/Show";
import AuthLayout from "~/layout/AuthLayout";
import { gqlRequest } from "~/utils/helper/gql";
import { NextPageLayoutType } from "~/types/nextMod";
import SignUpQuery from "~/utils/gql/User/SignUp.gql";
import ContainerLayout from "~/layout/ContainerLayout";
import { useAuthContext } from "~/context/AuthContext";
import { useTokenContext } from "~/context/TokenContext";
import SimpleInput from "~/components/Input/SimpleInput";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import { firstName, lastName, email, password } from "~/utils/validation";
import ButtonWithTextAndSpinner from "~/components/Button/ButtonWithTextAndSpinner";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = object({
  firstName,
  lastName,
  email,
  password,
  confirmPassword: password.oneOf([ref("password")], "Password does not match"),
});

const signUpRequest = (getValues: UseFormGetValues<SignUpFormType>) =>
  gqlRequest({
    query: SignUpQuery,
    variable: {
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      email: getValues("email"),
      password: getValues("password"),
    },
  });

interface SignUpFormType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

  const onSubmit: SubmitHandler<SignUpFormType> = () => {
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
  } = useForm<SignUpFormType>({ resolver: yupResolver(schema) });

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

SignUp.getLayout = (page) => (
  <ContainerLayout>
    <AuthLayout page={page} isAuth={false} redirect="/Dashboard" />
  </ContainerLayout>
);

export default SignUp;
