import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";

import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";

import { useNotificationContext } from "~/context/NotificationContext";

const UpdateUserPictureModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  picture: string;
}> = ({ isOpen, setIsOpen, picture }) => {
  const { addNotification } = useNotificationContext();

  const isLoading = false;

  const errorNotification = () =>
    addNotification("error", "Something went wrong");

  const exitModal = () => {
    if (isLoading) return;
    setIsOpen(false);
  };

  return (
    <ModalContainer
      title="Update picture"
      isOpen={isOpen}
      exitModal={exitModal}
    >
      <div className="w-96">
        <div className="flex items-center justify-center">
          <div className="relative h-28 w-28">
            <Image
              src={picture}
              alt="profile picture"
              layout="fill"
              className="rounded-full"
            />
          </div>
          <div className="ml-8">
            <SmallButton
              text="Remove"
              type="submit"
              className="border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700 disabled:border-black disabled:bg-black"
              isLoading={isLoading}
            />

            <SmallButton
              text="Change"
              type="submit"
              className="mt-4 border-indigo-600 bg-indigo-600 text-white hover:border-indigo-700 hover:bg-indigo-700 disabled:border-black disabled:bg-black"
              isLoading={isLoading}
            />
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
