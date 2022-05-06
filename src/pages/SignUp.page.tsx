import { object } from "yup";
import Link from "next/link";
import { NextPage } from "next";
import { useImmer } from "use-immer";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmojiHappyIcon, MailIcon } from "@heroicons/react/solid";
import { SubmitHandler, useForm, UseFormGetValues } from "react-hook-form";

import Spinner from "~/components/Spinner";
import { gqlRequest } from "~/utils/helper/gql";
import SignUpQuery from "~/utils/gql/User/SignUp.gql";
import { useAuthContext } from "~/context/AuthContext";
import { name, email, password } from "~/utils/validation";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

const schema = object({ name, email, password });
const signUpRequest = (getValues: UseFormGetValues<SignUpFormType>) =>
  gqlRequest({ query: SignUpQuery, variable: getValues() });

interface SignUpFormType {
  name: string;
  email: string;
  password: string;
}

const SignUp: NextPage = () => {
  const { isAuth, setIsAuth } = useAuthContext();
  const router = useRouter();

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

    if (typename === "User") {
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

  if (isAuth) {
    router.push("/App");
    return null;
  }

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

        {isError && (
          <p className="pb-4 text-center text-red-500">Something went wrong</p>
        )}

        {isSuccess && (
          <p className="pb-4 text-center text-green-500">Login successful</p>
        )}

        <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={isLoading}>
            <InputWithLeftIcon
              register={register("name")}
              label="Name"
              errorMessage={errors.name?.message}
              placeholder="seller name"
              Icon={<EmojiHappyIcon />}
            />

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

            <button
              type="submit"
              className="mt-8 flex h-12 w-full justify-center rounded-md bg-indigo-600 py-3 text-white hover:bg-indigo-500 disabled:bg-neutral-900"
            >
              {isLoading ? (
                <Spinner className="h-5 w-5 text-white" />
              ) : (
                "SignUp"
              )}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
