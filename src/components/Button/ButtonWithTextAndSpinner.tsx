import { FC } from "react";
import Spinner from "../Spinner";
import { classNames } from "~/utils/helper/tailwind";

const ButtonWithTextAndSpinner: FC<{
  text: string;
  isLoading: boolean;
  className?: string;
}> = ({ text, isLoading, className }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={classNames(
        className,
        "mt-8 flex h-12 w-full justify-center rounded-md bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-500 disabled:bg-neutral-900"
      )}
    >
      {isLoading ? <Spinner className="h-5 w-5 text-white" /> : text}
    </button>
  );
};

ButtonWithTextAndSpinner.defaultProps = {
  className: "",
};
export default ButtonWithTextAndSpinner;
