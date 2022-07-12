import { ReactNode } from "react";
import { v4 } from "uuid";
import clsx from "clsx";

import {
  CommonInputType,
  ErrorMessage,
  TextInput,
  Label,
  IconContainer,
  LeftIconContainer,
  IconBase,
} from "./Atom";

interface Props extends CommonInputType {
  Icon: ReactNode;
}

const InputWithLeftIcon = ({
  className,
  label,
  placeholder,
  register,
  disabled = false,
  type,
  errorMessage,
  Icon,
}: Props) => {
  const id = v4();
  return (
    <div className={clsx(className, disabled && "pointer-events-none")}>
      <Label id={id} label={label} />
      <IconContainer>
        <LeftIconContainer>
          <IconBase Icon={Icon} />
        </LeftIconContainer>
        <TextInput
          placeholder={placeholder}
          register={register}
          id={id}
          className="pl-10"
          type={type}
        />
      </IconContainer>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

InputWithLeftIcon.defaultProps = {
  type: "text",
  className: "",
  errorMessage: "",
};

export default InputWithLeftIcon;
