import Link from "next/link";
import { object, ref } from "yup";
import { useImmer } from "use-immer";
import { useMutation } from "react-query";
import { FormikHelpers, useFormik } from "formik";
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

const validationSchema = object({
  firstName,
  lastName,
  email,
  password,
  confirmPassword: password.oneOf([ref("password")], "Password does not match"),
});

const signUpRequest = (value: SignUpFormType) =>
  gqlRequest({
    query: SignUpQuery,
    variable: {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: value.password,
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
      setErrors({ email: "email already exist" });
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

  const onSubmit = (value: SignUpFormType) => {
    try {
      setRequestStatus((draft) => {
        draft.isLoading = true;
      });
      mutateAsync(value);
    } catch (error) {
      onError();
    }
  };

  const initialValues: SignUpFormType = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { errors, handleSubmit, touched, getFieldProps, setErrors } =
    useFormik<SignUpFormType>({
      initialValues,
      validationSchema,
      onSubmit,
    });

  const errorMessage = (key: keyof SignUpFormType) =>
    errors[key] && touched[key] && errors[key];

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

        <form className="w-96" onSubmit={handleSubmit}>
          <fieldset disabled={isLoading}>
            <div className="flex">
              <InputWithLeftIcon
                label="First Name"
                getFieldProps={getFieldProps("firstName")}
                errorMessage={errorMessage("firstName")}
                placeholder="first name"
                className="mr-4"
                Icon={<EmojiHappyIcon />}
              />

              <SimpleInput
                getFieldProps={getFieldProps("lastName")}
                label="Last Name"
                errorMessage={errorMessage("lastName")}
                placeholder="last name"
              />
            </div>

            <InputWithLeftIcon
              getFieldProps={getFieldProps("email")}
              errorMessage={errorMessage("email")}
              label="Email"
              className="my-4"
              placeholder="example@abc.com"
              Icon={<MailIcon />}
            />

            <PasswordInputWithLeftIcon
              getFieldProps={getFieldProps("password")}
              className="mt-4"
              label="Password"
              errorMessage={errorMessage("password")}
              type="password"
              placeholder="strong password"
            />

            <PasswordInputWithLeftIcon
              getFieldProps={getFieldProps("confirmPassword")}
              errorMessage={errorMessage("confirmPassword")}
              className="mt-4"
              label="Confirm Password"
              type="password"
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
