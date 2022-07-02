import Image from "next/image";
import { useQueryClient } from "react-query";
import { Dispatch, FC, SetStateAction } from "react";

import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";

import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import RemoveUserPictureOperation from "~/utils/gql/User/RemoveUserPicture.gql";

import {
  RemoveUserPictureMutation,
  RemoveUserPictureMutationVariables,
} from "~/types/graphql";

const UpdateUserPictureModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const queryClient = useQueryClient();

  const { setAuthFalse } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const { isLoading, mutate } = useAuthMutationHook<
    RemoveUserPictureMutation,
    RemoveUserPictureMutationVariables
  >("RemoveUserPictureOperation", RemoveUserPictureOperation, () => ({}), {
    onError: () => errorNotification(),
    onSuccess: (data) => {
      if (!data) return errorNotification();

      const responseData = data.removeUserPicture;

      switch (responseData.__typename) {
        case "SuccessResponse":
          queryClient.invalidateQueries("ReadUserFirstNameAndPictureOperation");
          queryClient.invalidateQueries("ReadUserOperation");
          exitModal();
          break;

        case "TokenError":
          setAuthFalse();
          break;

        default:
          errorNotification();
          break;
      }
    },
  });

  const exitModal = () => {
    if (isLoading) return;
    setIsOpen(false);
  };

  const handleRemovePicture = () => {
    mutate();
  };

  return (
    <ModalContainer
      title="Update picture"
      isOpen={isOpen}
      exitModal={exitModal}
    >
      <div className="w-96">
        <div className="flex items-center justify-center">
          <div className="relative h-28 w-28"></div>
          <div className="ml-8">
            <fieldset disabled={isLoading}>
              <SmallButton
                text="Remove"
                onClick={handleRemovePicture}
                type="button"
                className="border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700 disabled:border-black disabled:bg-black"
                isLoading={isLoading}
              />

              <SmallButton
                text="Change"
                type="button"
                className="mt-4 border-indigo-600 bg-indigo-600 text-white hover:border-indigo-700 hover:bg-indigo-700 disabled:border-black disabled:bg-black"
                onClick={exitModal}
              />
            </fieldset>
          </div>
        </div>

        <fieldset disabled={isLoading} className="flex justify-center pt-8">
          <SmallButton
            text="Cancel"
            type="submit"
            className="bg-red-white mr-5 text-black hover:text-indigo-600"
            onClick={exitModal}
          />
        </fieldset>
      </div>
    </ModalContainer>
  );
};

export default UpdateUserPictureModal;
