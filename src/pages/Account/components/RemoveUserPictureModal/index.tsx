import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";

import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";

import useMutation from "./useMutation";

const RemoveUserPictureModal: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  picture: string;
  setIsOpenUpdateUserPicture: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen, picture, setIsOpenUpdateUserPicture }) => {
  const exitModal = () => {
    if (isLoading) return;
    setIsOpen(false);
  };

  const { isLoading, mutate } = useMutation(exitModal);

  const handleRemovePicture = () => {
    mutate();
  };

  const handleOpenUpdateUserPictureModal = () => {
    exitModal();
    setIsOpenUpdateUserPicture(true);
  };

  return (
    <ModalContainer
      title="Remove picture"
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
                onClick={handleOpenUpdateUserPictureModal}
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

export default RemoveUserPictureModal;
