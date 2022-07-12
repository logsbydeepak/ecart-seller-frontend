import { clsx } from "clsx";
import { PropsWithChildren } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { ExclamationIcon } from "@heroicons/react/outline";

const IconContainer = ({
  children,
  className,
}: PropsWithChildren<{ className: string }>) => (
  <div className={clsx("rounded-md p-1.5", className)}>{children}</div>
);

export const SuccessIcon = () => (
  <IconContainer className="bg-green-200">
    <CheckIcon className="h-5 w-5 text-green-800" />
  </IconContainer>
);

export const ErrorIcon = () => (
  <IconContainer className="bg-red-200">
    <ExclamationIcon className="h-5 w-5 text-red-800" />
  </IconContainer>
);

export const CloseButtonIcon = ({
  handleOnClick,
}: {
  handleOnClick: () => void;
}) => (
  <button
    className="ml-auto rounded-md  p-1.5 hover:bg-neutral-100"
    onClick={handleOnClick}
  >
    <XIcon className="h-5 w-5 text-neutral-500" />
  </button>
);
