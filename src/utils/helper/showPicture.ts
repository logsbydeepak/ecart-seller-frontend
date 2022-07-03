const showPicture = (image: string) => {
  return image === "default"
    ? `${process.env.NEXT_PUBLIC_DEFAULT_PICTURE}`
    : `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${image}`;
};

export default showPicture;
