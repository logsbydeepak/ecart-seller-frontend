import Spinner from "../Spinner";
import clsx from "clsx";

const ButtonWithTextAndSpinner = ({
  text,
  isLoading,
  className,
}: {
  text: string;
  isLoading: boolean;
  className?: string;
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={clsx(
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
