import { FC, ReactNode } from "react";
import { v4 } from "uuid";
import { classNames } from "~/utils/helper/tailwind";

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
  disabled = false,
  type,
  errorMessage,
  Icon,
}) => {
  const id = v4();
  return (
    <div className={classNames(className, disabled && "pointer-events-none")}>
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
