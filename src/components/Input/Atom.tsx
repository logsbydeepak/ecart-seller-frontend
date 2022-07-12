import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";
import { PropsWithChildren, ReactNode } from "react";

export interface CommonInputType {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;

  disabled?: boolean;
  className?: string;
  errorMessage?: string;
  type?: string;
}

export const TextInput = ({
  placeholder,
  id,
  type,
  register,
  className,
}: {
  placeholder: string;
  id: string;
  register: UseFormRegisterReturn;
  className: string;
  type?: string;
}) => (
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

export const LeftIcon = ({ Icon }: { Icon: ReactNode }) => (
  <div className="pointer-events-none absolute left-0 flex h-full w-11 items-center justify-center">
    <span className="w-4 text-neutral-500">{Icon}</span>
  </div>
);

export const RightButtonIcon = ({
  Icon,
  handleOnClick,
}: {
  Icon: ReactNode;
  handleOnClick: () => void;
}) => (
  <button
    type="button"
    onClick={handleOnClick}
    className="absolute right-0 flex h-full w-11 items-center justify-center"
  >
    <span className="w-4 text-neutral-500">{Icon}</span>
  </button>
);

export const ErrorMessage = ({ message }: { message?: string }) => (
  <p className="mt-0.5 text-sm font-normal text-red-600">{message}</p>
);

export const Label = ({ label, id }: { label: string; id: string }) => (
  <label htmlFor={id} className="mb-0.5 text-sm">
    {label}
  </label>
);

export const IconContainer = ({ children }: PropsWithChildren) => (
  <div className="relative">{children}</div>
);

export const LeftIconContainer = ({ children }: PropsWithChildren) => (
  <div className="pointer-events-none absolute left-0 h-full">{children}</div>
);

export const RightIconContainer = ({ children }: PropsWithChildren) => (
  <div className="absolute right-0 h-full">{children}</div>
);

export const IconBase = ({ Icon }: { Icon: ReactNode }) => (
  <div className="flex h-full w-11 items-center justify-center text-neutral-500">
    <span className="w-4">{Icon}</span>
  </div>
);
