import { FC, ReactNode } from "react";
import { v4 } from "uuid";

import {
  CommonInputType,
  ErrorMessage,
  TextInput,
  Label,
  IconContainer,
  LeftIconContainer,
  IconBase,
} from "./Atom";

interface PropType extends CommonInputType {
  Icon: ReactNode;
}

const InputWithLeftIcon: FC<PropType> = ({
  className,
  label,
  placeholder,
  register,
  type,
  errorMessage,
  Icon,
}) => {
  const id = v4();
  return (
    <div className={className}>
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
