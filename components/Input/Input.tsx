import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { FC, ReactNode, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { v4 } from "uuid";
import {
  ErrorMessage,
  IconBase,
  IconContainer,
  Label,
  LeftIconContainer,
  RightIconContainer,
  TextInput,
} from "./Atom";

interface CommonInputType {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;

  className?: string;
  errorMessage?: string;
  type?: string;
}

interface SimpleInputType extends CommonInputType {}

interface LeftIconInput extends CommonInputType {
  Icon: ReactNode;
}

interface LeftIconRightButtonIconInput extends CommonInputType {
  LeftIcon: ReactNode;
  RightButtonIcons: { Icon: ReactNode; handleOnClick: () => void }[];
}

interface LeftIconRightButtonPasswordIconInput extends CommonInputType {
  LeftIcon: ReactNode;
  RightButtonIcons?: { Icon: ReactNode; handleOnClick: () => void }[];
}

export const SimpleInput: FC<SimpleInputType> = ({
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

export const LeftIconInput: FC<LeftIconInput> = ({
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

LeftIconInput.defaultProps = {
  type: "text",
  className: "",
  errorMessage: "",
};

export const LeftIconRightButtonIconInput: FC<LeftIconRightButtonIconInput> = ({
  className,
  label,
  placeholder,
  register,
  type,
  errorMessage,
  LeftIcon,
  RightButtonIcons,
}) => {
  const id = v4();
  return (
    <div className={className}>
      <Label id={id} label={label} />
      <IconContainer>
        <LeftIconContainer>
          <IconBase Icon={LeftIcon} />
        </LeftIconContainer>

        <RightIconContainer>
          {RightButtonIcons?.map(({ Icon, handleOnClick }) => (
            <button onClick={handleOnClick}>
              <IconBase Icon={Icon} />
            </button>
          ))}
        </RightIconContainer>

        <TextInput
          placeholder={placeholder}
          register={register}
          id={id}
          className={`pl-10 ${`pr-${10 * (RightButtonIcons.length + 1)} `}`}
          type={type}
        />
      </IconContainer>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export const LeftIconRightButtonPasswordIconInput: FC<
  LeftIconRightButtonPasswordIconInput
> = ({
  className,
  label,
  placeholder,
  register,
  type,
  errorMessage,
  LeftIcon,
  RightButtonIcons,
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  const toggleShowPassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const id = v4();
  return (
    <div className={className}>
      <Label id={id} label={label} />
      <IconContainer>
        <LeftIconContainer>
          <IconBase Icon={LeftIcon} />
        </LeftIconContainer>

        <RightIconContainer>
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-0 flex h-full w-11 items-center justify-center"
          >
            <IconBase Icon={isPasswordHidden ? <EyeOffIcon /> : <EyeIcon />} />
          </button>

          {RightButtonIcons?.map(({ Icon, handleOnClick }) => (
            <button onClick={handleOnClick}>
              <IconBase Icon={Icon} />
            </button>
          ))}
        </RightIconContainer>

        <TextInput
          placeholder={placeholder}
          register={register}
          id={id}
          className={`pl-10 ${
            RightButtonIcons?.length
              ? `pr-${10 * (RightButtonIcons.length + 1) + 10} `
              : "pr-10"
          }`}
          type={isPasswordHidden ? "text" : "password"}
        />
      </IconContainer>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
