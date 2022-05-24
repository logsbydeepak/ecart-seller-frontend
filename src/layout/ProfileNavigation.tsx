import Link from "next/link";
import { FC, ReactElement, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { CreditCardIcon, IdentificationIcon } from "@heroicons/react/outline";
import {
  CreditCardIcon as CreditCardIconSolid,
  IdentificationIcon as IdentificationIconSolid,
} from "@heroicons/react/solid";

import { classNames } from "~/utils/helper/tailwind";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import AuthLayout from "./AuthLayout";
import Show from "~/components/Show";
import { useSideBarContext } from "~/context/SideBarContext";

const ProfileNavigationLayout = (page: ReactElement) => {
  return (
    <AuthLayout
      page={<ProfileNavigation>{page}</ProfileNavigation>}
      isAuth={true}
      redirect="/Login"
    />
  );
};

const ProfileNavigation: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname.toLowerCase();

  const { sideBarIsOpen, setSideBarIsOpen } = useSideBarContext();

  useEffect(() => {
    setSideBarIsOpen(true);
  }, [setSideBarIsOpen]);

  return (
    <div className="flex">
      <div
        className={classNames(
          sideBarIsOpen ? "inline-block" : "hidden",
          "mr-8 h-screen w-72 pt-20"
        )}
      >
        <Item
          icon={<IdentificationIcon />}
          solidIcon={<IdentificationIconSolid />}
          name="Account"
          url="/Profile"
          active={currentPath === "/profile"}
        />
        <Item
          icon={<CreditCardIcon />}
          solidIcon={<CreditCardIconSolid />}
          name="Payment"
          url="/Profile/Payment"
          active={currentPath === "/profile/payment"}
        />
      </div>
      <div className="mx-auto w-full max-w-screen-2xl px-8 py-20">
        {children}
      </div>
    </div>
  );
};

const Item: FC<{
  url: string;
  name: string;
  icon: ReactNode;
  solidIcon: ReactNode;
  active: boolean;
}> = ({ url, name, icon, active, solidIcon }) => {
  return (
    <Link href={url}>
      <a
        className={classNames(
          active
            ? "bg-neutral-700 text-white hover:bg-neutral-800"
            : "hover:bg-neutral-100",
          "flex items-center rounded-r-full py-3 pl-6 "
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

const TabLink: FC<{
  Icon: ReactNode;
  text: string;
  link: string;
  active: boolean;
}> = ({ Icon, text, link, active }) => (
  <Link href={link}>
    <a
      className={classNames(
        active
          ? "bg-indigo-50 text-indigo-800 hover:bg-indigo-100"
          : "text-neutral-600 hover:bg-neutral-100",
        "mb-2 flex w-full items-center rounded-md p-3 text-sm font-medium "
      )}
    >
      <span className="mr-2 h-6 w-6">{Icon}</span>
      {text}
    </a>
  </Link>
);

export default ProfileNavigationLayout;
