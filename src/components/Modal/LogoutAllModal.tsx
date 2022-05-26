import { Dispatch, FC, SetStateAction } from "react";

import ModalContainer from "./Atom/ModalContainer";
import { useAuthContext } from "~/context/AuthContext";
import { useMutation } from "react-query";
import PasswordInputWithLeftIcon from "../Input/PasswordInputWithLeftIcon";
import { useForm, UseFormGetValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { password } from "~/utils/validation";
import { object } from "yup";
import Show from "../Show";
import { gqlRequest } from "~/utils/helper/gql";
import LogoutAllSessionQuery from "~/utils/gql/Session/DeleteAllSession.gql";

interface FormType {
  password: string;
}

const schema = object({
  password: password,
});

const logoutAllRequest = async (getValues: UseFormGetValues<FormType>) => {
  try {
    const request = await gqlRequest({
      query: LogoutAllSessionQuery,
      variable: getValues(),
    });
    return request;
  } catch {
    throw { message: "Something went wrong" };
  }
};

const LogoutAllModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { setIsAuth } = useAuthContext();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormType>({ resolver: yupResolver(schema) });

  const onSuccess = (data: any) => {
    const deleteAllSession = data.createSession;
    const typename = deleteAllSession.__typename;

    if (typename === "SuccessResponse") {
      setIsOpen(false);
      setIsAuth(false);
    }
  };

  const onError = () => {};

  const { mutateAsync, isLoading, isError } = useMutation(logoutAllRequest, {
    onSuccess,
    onError,
    retry: 3,
  });

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  const onSubmit = () => {
    mutateAsync(getValues);
  };

  return (
    <ModalContainer title="Logout All" isOpen={isOpen} exitModal={exitModal}>
      <Show when={isError}>
        <p className="pb-4 text-center text-red-500">Something went wrong</p>
      </Show>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <fieldset disabled={isLoading}>
          <PasswordInputWithLeftIcon
            register={register("password")}
            className="mb-6 text-left"
            label="Current Password"
            type="password"
            errorMessage={errors.password?.message}
            placeholder="********"
          />

          <button
            className="mr-5 rounded-md border-2 border-slate-100 px-4 py-2 text-sm hover:text-indigo-600"
            type="button"
            onClick={exitModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md border-2 border-red-600 bg-red-600 px-4 py-1.5 text-sm text-white hover:border-red-700 hover:bg-red-700"
          >
            Logout
          </button>
        </fieldset>
      </form>
    </ModalContainer>
  );
};

export default LogoutAllModal;
