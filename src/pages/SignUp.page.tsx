import { object } from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmojiHappyIcon, MailIcon } from "@heroicons/react/solid";

import { name, email, password } from "~/utils/validation";
import { useAuthContext } from "~/utils/Context/AuthContext";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";
import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";
import SignUpQuery from "~/utils/gql/User/SignUp.gql";

const schema = object({ name, email, password });

const SignUp = () => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (isAuth) {
    router.push("/App");
    return null;
  }
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // const signUpQuery = gql`
  //   mutation CreateUser($name: String!, $email: String!, $password: String!) {
  //     createUser(name: $name, email: $email, password: $password) {
  //       ... on User {
  //         name
  //         email
  //       }
  //       ... on ErrorResponse {
  //         title
  //         message
  //       }
  //     }
  //   }
  // `;

  const signUpVariable = {
    name: getValues("name"),
    email: getValues("email"),
    password: getValues("password"),
  };

  const graphQLClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_API_BASE_URL as string,
    {
      credentials: "include",
      mode: "cors",
    }
  );

  const signUpRequest = async () => {
    graphQLClient
      .request(SignUpQuery, signUpVariable)
      .then((data) => console.log(data));
  };

  const { refetch } = useQuery("login", signUpRequest, { enabled: false });

  const onSubmit = (data: any) => {
    refetch();
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
              className="mt-8 w-full rounded-md bg-indigo-600 py-3 text-white hover:bg-indigo-500 dark:bg-indigo-400 dark:font-semibold dark:text-black dark:hover:bg-indigo-500"
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
