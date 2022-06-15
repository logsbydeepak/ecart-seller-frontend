import { FC, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";

export interface CommonInputType {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;

  disabled?: boolean;
  className?: string;
  errorMessage?: string;
  type?: string;
}

export const TextInput: FC<{
  placeholder: string;
  id: string;
  register: UseFormRegisterReturn;
  className: string;
  type?: string;
}> = ({ placeholder, id, type, register, className }) => (
  <input
    placeholder={placeholder}
    id={id}
    type={type}
    {...register}
    className={clsx(
      className,
      "block w-full rounded-md border-2 border-slate-200 bg-slate-50 text-base ring-0 focus:border-indigo-600 focus:bg-white focus:ring-indigo-400"
    )}
  />
);

export const LeftIcon: FC<{ Icon: ReactNode }> = ({ Icon }) => (
  <div className="pointer-events-none absolute left-0 flex h-full w-11 items-center justify-center">
    <span className="w-4 text-neutral-500">{Icon}</span>
  </div>
);

export const RightButtonIcon: FC<{
  Icon: ReactNode;
  handleOnClick: () => void;
}> = ({ Icon, handleOnClick }) => (
  <button
    type="button"
    onClick={handleOnClick}
    className="absolute right-0 flex h-full w-11 items-center justify-center"
  >
    <span className="w-4 text-neutral-500">{Icon}</span>
  </button>
);

export const ErrorMessage: FC<{ message?: string }> = ({ message }) => (
  <p className="mt-0.5 text-sm font-normal text-red-600">{message}</p>
);

export const Label: FC<{ label: string; id: string }> = ({ label, id }) => (
  <label htmlFor={id} className="mb-0.5 text-sm">
    {label}
  </label>
);

export const IconContainer: FC<PropsWithChildrenOnlyType> = ({ children }) => (
  <div className="relative">{children}</div>
);

export const LeftIconContainer: FC<PropsWithChildrenOnlyType> = ({
  children,
}) => (
  <div className="pointer-events-none absolute left-0 h-full">{children}</div>
);

export const RightIconContainer: FC<PropsWithChildrenOnlyType> = ({
  children,
}) => <div className="absolute right-0 h-full">{children}</div>;

export const IconBase: FC<{ Icon: ReactNode }> = ({ Icon }) => (
  <div className="flex h-full w-11 items-center justify-center text-neutral-500">
    <span className="w-4">{Icon}</span>
  </div>
);
