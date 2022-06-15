import Link from "next/link";
import { FC, ReactNode } from "react";
import clsx from "clsx";
import Show from "../Show";

const SideBarItem: FC<{
  url: string;
  name: string;
  icon: ReactNode;
  solidIcon: ReactNode;
  active: boolean;
}> = ({ url, name, icon, active, solidIcon }) => {
  return (
    <Link href={url}>
      <a
        className={clsx(
          active
            ? "bg-neutral-700 text-white hover:bg-neutral-800"
            : "hover:bg-neutral-100",
          "flex items-center rounded-r-lg py-3 pl-6 "
        )}
      >
        <div className="mr-4 h-4 w-4">
          <Show when={!active}>{icon}</Show>
          <Show when={active}>{solidIcon}</Show>
        </div>
        <p className="text-sm">{name}</p>
      </a>
    </Link>
  );
};

export default SideBarItem;
