import { CreditCardIcon, IdentificationIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { PropsWithChildrenOnlyType } from "../utils/types";
import { classNames } from "../utils/helper";
import { useAuthContext } from "../utils/Context/AuthContext";

const ProfileNavigationLayout = (page: ReactNode) => {
  return <ProfileNavigation>{page}</ProfileNavigation>;
};

const ProfileNavigation: FC<PropsWithChildrenOnlyType> = ({ children }) => {
  const router = useRouter();
  const { isAuth } = useAuthContext();

  if (!isAuth) {
    router.push("/Login");
    return null;
  }

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
          ? "dark:text-indigo-300"
          : "dark:text-neutral-300 hover:dark:text-neutral-200",
        "flex w-full items-center rounded-md p-3 text-sm font-medium  hover:dark:bg-neutral-800"
      )}
    >
      <span className="mr-2 h-6 w-6">{Icon}</span>
      {text}
    </a>
  </Link>
);

export default ProfileNavigationLayout;
