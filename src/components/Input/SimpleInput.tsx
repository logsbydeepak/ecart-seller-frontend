import { FC } from "react";
import { v4 } from "uuid";
import clsx from "clsx";

import { CommonInputType, ErrorMessage, TextInput, Label } from "./Atom";

const SimpleInput: FC<CommonInputType> = ({
  className,
  label,
  placeholder,
  type,
  register,
  disabled,
  errorMessage,
}) => {
  const id = v4();
  return (
    <div className={clsx(className, disabled && "pointer-events-none")}>
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
