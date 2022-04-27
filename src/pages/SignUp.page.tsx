import { object } from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmojiHappyIcon, MailIcon } from "@heroicons/react/solid";

import { name, email, password } from "~/utils/validation";
import { useAuthContext } from "~/utils/Context/AuthContext";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";
import { useMutation } from "react-query";
import SignUpQuery from "~/utils/gql/User/SignUp.gql";
import { gqlRequest } from "~/utils/helper";

const schema = object({ name, email, password });

interface SignUpFormType {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const { isAuth, setIsAuth } = useAuthContext();
  const router = useRouter();

  if (isAuth) {
    router.push("/App");
    return null;
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormType>({ resolver: yupResolver(schema) });

  const onError = async () => {};

  const signUpRequest = (data: SignUpFormType) => gqlRequest(SignUpQuery, data);

  const { isLoading, mutateAsync } = useMutation(signUpRequest, {
    retry: 3,
    onError,
  });

  const onSubmit: SubmitHandler<SignUpFormType> = async (data: any) => {
    const signUpUser = await mutateAsync(data);

    if (
      signUpUser?.data?.createUser?.title === "AUTHENTICATION" &&
      signUpUser?.data?.createUser?.message === "email already exist"
    ) {
      setError(
        "email",
        { message: "email already exist" },
        { shouldFocus: true }
      );
    } else {
      setIsAuth(true);
      router.push("/App");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center	justify-center py-20">
        <div className="rounded-lg border-2 px-10 py-16 dark:border-neutral-800">
          <h1 className="pb-4 text-center text-4xl font-bold text-slate-900 dark:text-slate-50  ">
            Create Account
          </h1>
          <p className="mb-8 text-center">
            Already have an account?
            <Link href="/Login">
              <a className="ml-2 text-indigo-600 hover:text-indigo-500 hover:underline dark:text-indigo-300 dark:hover:text-indigo-400">
                Login
              </a>
            </Link>
          </p>
          <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
            <InputWithLeftIcon
              register={register("name", { disabled: isLoading })}
              label="Name"
              errorMessage={errors.name?.message}
              placeholder="seller name"
              Icon={<EmojiHappyIcon />}
            />

            <InputWithLeftIcon
              register={register("email", { disabled: isLoading })}
              label="Email"
              className="my-4"
              errorMessage={errors.email?.message}
              placeholder="example@abc.com"
              Icon={<MailIcon />}
            />

            <PasswordInputWithLeftIcon
              register={register("password", { disabled: isLoading })}
              className="mt-4"
              label="Password"
              type="password"
              errorMessage={errors.password?.message}
              placeholder="strong password"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="mt-8 w-full rounded-md bg-indigo-600 py-3 text-white hover:bg-indigo-500 dark:bg-indigo-400 dark:font-semibold dark:text-black dark:hover:bg-indigo-500 dark:disabled:bg-neutral-400"
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
