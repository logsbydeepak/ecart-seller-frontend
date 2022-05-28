import { EyeIcon, EyeOffIcon, LockClosedIcon } from "@heroicons/react/solid";
import { FC, useState } from "react";
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
  RightIconContainer,
} from "./Atom";

interface PropType extends CommonInputType {}

const PasswordInputWithLeftIcon: FC<PropType> = ({
  className,
  label,
  placeholder,
  register,
  disabled,
  errorMessage,
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  const toggleShowPassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const id = v4();
  return (
    <div className={classNames(className, disabled && "pointer-events-none")}>
      <Label id={id} label={label} />
      <IconContainer>
        <LeftIconContainer>
          <IconBase Icon={<LockClosedIcon />} />
        </LeftIconContainer>

        <RightIconContainer>
          <button type="button" onClick={toggleShowPassword} className="h-full">
            <IconBase Icon={isPasswordHidden ? <EyeOffIcon /> : <EyeIcon />} />
          </button>
        </RightIconContainer>

        <TextInput
          placeholder={placeholder}
          register={register}
          id={id}
          className="px-10"
          type={isPasswordHidden ? "text" : "password"}
        />
      </IconContainer>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

PasswordInputWithLeftIcon.defaultProps = {
  type: "text",
  className: "",
  errorMessage: "",
};

export default PasswordInputWithLeftIcon;
