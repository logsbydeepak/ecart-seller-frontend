import { Dispatch, FC, SetStateAction, SyntheticEvent, useState } from "react";

import "react-image-crop/dist/ReactCrop.css";
import { useDropzone } from "react-dropzone";
import { useQueryClient } from "react-query";
import ReactCrop, { Crop } from "react-image-crop";

import Show from "~/components/Show";
import SmallButton from "~/components/Button/SmallButton";
import ModalContainer from "~/components/Modal/Atom/ModalContainer";

import { useAuthContext } from "~/context/AuthContext";
import { useNotificationContext } from "~/context/NotificationContext";

import useAuthMutationHook from "~/hooks/useAuthMutationHook";
import UpdateUserPictureOperation from "~/utils/gql/User/UpdateUserPicture.gql";

import {
  RemoveUserPictureMutation,
  RemoveUserPictureMutationVariables,
  UpdateUserPictureMutation,
  UpdateUserPictureMutationVariables,
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
    UpdateUserPictureMutation,
    UpdateUserPictureMutationVariables
  >(
    "UpdateUserPictureOperation",
    UpdateUserPictureOperation,
    () => ({ file: handleImageCreation() }),
    {
      onError: () => errorNotification(),
      onSuccess: (data) => {
        if (!data) return errorNotification();

        const responseData = data.updateUserPicture;

        switch (responseData.__typename) {
          case "UpdateUserPictureSuccessResponse":
            queryClient.invalidateQueries(
              "ReadUserFirstNameAndPictureOperation"
            );
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
    }
  );

  const exitModal = () => {
    if (isLoading) return;
    setIsOpen(false);
  };

  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const [src, setSrc] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [image, setImage] = useState(
    null as unknown as EventTarget & HTMLImageElement
  );

  const handleImageCreation = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return canvas.toDataURL("image/jpeg", 1);
  };

  const handleUpload = () => {
    mutate();
  };

  return (
    <ModalContainer
      title="Update picture"
      isOpen={isOpen}
      exitModal={exitModal}
    >
      <div className="w-96">
        <div className="mb-8 h-48">
          <Show when={!isImageSelected}>
            <DropImage
              setSrc={setSrc}
              setIsImageSelected={setIsImageSelected}
            />
          </Show>
          <Show when={isImageSelected}>
            <CropImage
              crop={crop}
              src={src}
              setCrop={setCrop}
              setImage={setImage}
            />
          </Show>
        </div>
        <Show when={isImageSelected}>
          <div className="my-4 flex justify-center">
            <SmallButton
              text="Chose again"
              type="button"
              className=" mr-5 text-black hover:text-indigo-600"
              onClick={() => setIsImageSelected(false)}
            />

            <SmallButton
              text="Upload"
              type="submit"
              className="border-indigo-600 bg-indigo-600 text-white hover:border-indigo-700 hover:bg-indigo-700 disabled:border-black disabled:bg-black"
              onClick={handleUpload}
              isLoading={isLoading}
            />
          </div>
        </Show>

        <fieldset disabled={isLoading} className="flex justify-center">
          <SmallButton
            text="Cancel"
            type="button"
            className=" mr-5 text-black hover:text-indigo-600"
            onClick={exitModal}
          />
        </fieldset>
      </div>
    </ModalContainer>
  );
};

const DropImage: FC<{
  setSrc: Dispatch<SetStateAction<string>>;
  setIsImageSelected: Dispatch<SetStateAction<boolean>>;
}> = ({ setSrc, setIsImageSelected }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFile, rejectedFile) => {
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFile[0]);
      reader.onload = () => {
        setSrc(reader.result as string);
        setIsImageSelected(true);
      };
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex h-full w-full items-center  justify-center rounded-lg bg-neutral-50"
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop here</p> : <p>Drag or click to add file</p>}
    </div>
  );
};

const CropImage: FC<{
  src: string;
  crop: Crop;
  setCrop: Dispatch<SetStateAction<Crop>>;
  setImage: Dispatch<SetStateAction<EventTarget & HTMLImageElement>>;
}> = ({ src, setCrop, crop, setImage }) => {
  const handleOnLoad = (image: SyntheticEvent<HTMLImageElement, Event>) => {
    setImage(image.currentTarget);
  };

  return (
    <div className="h-full w-full rounded-lg bg-neutral-50 p-2">
      <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={1}>
        <img src={src} className="h-44 w-full" onLoad={handleOnLoad} />
      </ReactCrop>
    </div>
  );
};

export default UpdateUserPictureModal;
