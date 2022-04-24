import { FC } from "react";
import { v4 } from "uuid";

import { CommonInputType, ErrorMessage, TextInput, Label } from "./Atom";

const SimpleInput: FC<CommonInputType> = ({
  className,
  label,
  placeholder,
  register,
  type,
  errorMessage,
}) => {
  const id = v4();
  return (
    <div className={className}>
      <Label id={id} label={label} />
      <TextInput
        placeholder={placeholder}
        register={register}
        id={id}
        className=""
        type={type}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

SimpleInput.defaultProps = {
  className: "",
  errorMessage: "",
  type: "text",
};

export default SimpleInput;
