import { FC } from "react";
import { classNames } from "~/utils/helper/tailwind";
import Show from "../Show";
import Spinner from "../Spinner";

interface Props {
  isLoading?: boolean;
  type?: "button" | "submit";
  text: string;
  className?: string;
  onClick?: () => void;
}

const SmallButton: FC<Props> = ({
  isLoading = false,
  type = "button",
  text,
  className = "",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        className,
        "flex h-10 w-28 items-center  justify-center rounded-md border-2 text-sm font-medium"
      )}
    >
      <Show when={!isLoading}>{text}</Show>
      <Show when={isLoading}>
        <Spinner className="h-4 w-4" />
      </Show>
    </button>
  );
};

export default SmallButton;
