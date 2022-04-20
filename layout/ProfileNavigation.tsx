import { CreditCardIcon, IdentificationIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { FC, ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";

const ProfileNavigationLayout = (page: ReactElement) => {
  const router = useRouter();
  const currentPath = router.pathname.toLowerCase();

  return (
    <>
      <div className="fixed w-60">
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
      <div className="mb-20 ml-60 w-full max-w-4xl px-12">{page}</div>
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
      className={`${
        active
          ? "dark:text-indigo-300"
          : "dark:text-neutral-300 hover:dark:text-neutral-200"
      } flex w-full items-center rounded-md p-3 text-sm font-medium  hover:dark:bg-neutral-800  `}
    >
      <span className="mr-2 h-6 w-6">{Icon}</span>
      {text}
    </a>
  </Link>
);

export default ProfileNavigationLayout;
