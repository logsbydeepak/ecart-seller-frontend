import { ReactNode } from "react";
import Show from "../Show";
import Spinner from "../Spinner";

interface Props {
  title: string;
  children?: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

const SideBarContent = ({
  title,
  children,
  isLoading = false,
  isError = false,
  isSuccess = true,
}: Props) => {
  return (
    <>
      <h1 className="mb-10 text-2xl font-semibold">{title}</h1>
      <Show when={isLoading}>
        <div className="flex flex-col items-center justify-center p-20">
          <Spinner className="h-12 w-12 text-neutral-900" />
        </div>
      </Show>

      <Show when={isError}>
        <p className="p-20 pb-4 text-center text-red-500">
          Something went wrong
        </p>
      </Show>

      <Show when={isSuccess}>{children}</Show>
    </>
  );
};

export default SideBarContent;
