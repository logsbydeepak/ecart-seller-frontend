import { Dispatch, FC, SetStateAction } from "react";

import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";

import {
  DeleteSessionMutation,
  DeleteSessionMutationVariables,
} from "~/types/graphql";

import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import DeleteSessionOperation from "~/utils/gql/Session/DeleteSession.gql";

const LogoutModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { setAuthFalse } = useAuthContext();

  const { addNotification } = useNotificationContext();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const { isLoading, mutate } = useAuthMutationHook<
    DeleteSessionMutation,
    DeleteSessionMutationVariables
  >("DeleteSessionOperation", DeleteSessionOperation, () => ({}), {
    onError: () => errorNotification(),
    onSuccess: (data) => {
      if (!data) return errorNotification();
      const responseData = data.deleteSession;

      switch (responseData.__typename) {
        case "SuccessResponse":
          setAuthFalse();
          addNotification("success", "User Logout Successfully");
          break;

        case "TokenError":
          setAuthFalse();
          break;

        default:
          errorNotification();
      }
    },
  });

  const handleLogout = async () => {
    setIsOpen(true);
    mutate();
  };

  const exitModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  return (
    <ModalContainer title="Logout" isOpen={isOpen} exitModal={exitModal}>
      <p className="mb-4 max-w-md  text-neutral-600 ">
        Are you sure you want to logout? Click Logout Button to continue and
        Cancel Button to abort the process.
      </p>
      <fieldset disabled={isLoading} className="flex justify-center">
        <SmallButton
          text="Cancel"
          type="button"
          className="bg-red-white mr-5 text-black hover:text-indigo-600"
          onClick={exitModal}
        />

        <SmallButton
          text="Logout"
          type="submit"
          onClick={handleLogout}
          className="border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700 disabled:border-black disabled:bg-black"
          isLoading={isLoading}
        />
      </fieldset>
    </ModalContainer>
  );
};

export default LogoutModal;
