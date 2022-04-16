import { FC, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { v4 } from "uuid";

interface PropTypes {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  Icon: ReactNode;

  id?: string;
  className?: string;
  errorMessage?: string;
  type?: "text" | "password";
}

const IconInput: FC<PropTypes> = ({
  register,
  type,
  Icon,
  errorMessage,
  label,
  placeholder,
  className,
}) => {
  const id = v4();
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <div className="pointer-events-none absolute left-0 flex h-full w-11 items-center justify-center">
          <span className="w-5">{Icon}</span>
        </div>
        <input
          placeholder={placeholder}
          id={id}
          type={type}
          {...register}
          className="mt-1 block w-full rounded-md border-2 border-slate-200 bg-slate-50 pl-11 text-base ring-0 focus:border-indigo-600 focus:bg-white focus:ring-indigo-400
        dark:border-neutral-700 dark:bg-neutral-800 dark:placeholder:text-neutral-400
        dark:focus:border-indigo-400 dark:focus:ring-indigo-300
        "
        />
      </div>
      <p className="mt-1 text-sm font-normal text-red-500 dark:text-red-300">
        {errorMessage}
      </p>
    </div>
  );
};

IconInput.defaultProps = {
  className: "",
  type: "text",
};

export default IconInput;
