import Link from "next/link";
import { object, ref } from "yup";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmojiHappyIcon, MailIcon } from "@heroicons/react/solid";
import { SubmitHandler, useForm, UseFormGetValues } from "react-hook-form";

import AuthLayout from "~/layout/AuthLayout";
import ContainerLayout from "~/layout/ContainerLayout";

import { CreateUserMutation } from "~/types/graphql";
import { NextPageLayoutType } from "~/types/nextMod";

import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import { gqlRequest } from "~/utils/helper/gql";
import CreateUserQuery from "~/utils/gql/User/CreateUser.gql";
import { email, firstName, lastName, password } from "~/utils/validation";

import SimpleInput from "~/components/Input/SimpleInput";
import InputWithLeftIcon from "~/components/Input/InputWithLeftIcon";
import ButtonWithTextAndSpinner from "~/components/Button/ButtonWithTextAndSpinner";
import PasswordInputWithLeftIcon from "~/components/Input/PasswordInputWithLeftIcon";

interface FormType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const formValidationSchema = object({
  firstName,
  lastName,
  email,
  password,
  confirmPassword: password.oneOf([ref("password")], "Password does not match"),
});

const createUserRequest = async (getValues: UseFormGetValues<FormType>) => {
  try {
    return (await gqlRequest({
      query: CreateUserQuery,
      variable: {
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
        email: getValues("email"),
        password: getValues("password"),
      },
    })) as CreateUserMutation;
  } catch (error) {
    throw { message: "Something went wrong" };
  }
};

const useFormDate = () =>
  useForm<FormType>({ resolver: yupResolver(formValidationSchema) });

const SignUp: NextPageLayoutType = () => {
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

  const { isLoading, mutate } = useMutation(createUserRequest, {
    mutationKey: "createUser",
    retry: 3,
    onError: () => errorNotification(),
    onSuccess: (data) => {
      if (!data) return errorNotification();

      const responseData = data.createUser;
      switch (responseData.__typename) {
        case "Token":
          setAuthToken(responseData.token);
          addNotification("success", "User created successful");
          break;

        case "UserAlreadyExistError":
          setError(
            "email",
            { message: "email already exist" },
            { shouldFocus: true }
          );
          break;
        default:
          errorNotification();
      }
    },
  });

  const onSubmit: SubmitHandler<FormType> = () => {
    mutate(getValues);
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
