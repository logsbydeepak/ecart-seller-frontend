import Link from "next/link";
import { FC, ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import { CreditCardIcon, IdentificationIcon } from "@heroicons/react/outline";

import { classNames } from "~/utils/helper/tailwind";
import { PropsWithChildrenOnlyType } from "~/types/nextMod";
import AuthLayout from "./AuthLayout";

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

  return (
    <>
      <div className="fixed mt-8 w-60">
        <TabLink
          Icon={<IdentificationIcon />}
          text="Account"
          link="/Profile"
          active={currentPath === "/profile"}
        />
        <TabLink
          Icon={<CreditCardIcon />}
          text="Payment"
          link="/Profile/Payment"
          active={currentPath === "/profile/payment"}
        />
      </div>
      <div className="my-10 ml-60 w-full max-w-4xl px-10">{children}</div>
    </>
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
