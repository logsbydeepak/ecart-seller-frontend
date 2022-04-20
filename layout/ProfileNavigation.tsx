import { CreditCardIcon, IdentificationIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { FC, ReactElement, ReactNode } from "react";

const ProfileNavigationLayout = (page: ReactElement) => {
  return (
    <>
      <div className="fixed w-60">
        <TabLink Icon={<IdentificationIcon />} text="Account" link="/Profile" />
        <TabLink
          Icon={<CreditCardIcon />}
          text="Payment"
          link="/Profile/Payment"
        />
      </div>
      <div className="mb-20 ml-60 w-full max-w-4xl px-12">{page}</div>
    </>
  );
};

const TabLink: FC<{ Icon: ReactNode; text: string; link: string }> = ({
  Icon,
  text,
  link,
}) => (
  <Link href={link}>
    <a className="flex w-full items-center rounded-md p-3 text-sm font-medium dark:text-neutral-300 hover:dark:bg-neutral-800  hover:dark:text-neutral-200">
      <span className="mr-2 h-6 w-6">{Icon}</span>
      {text}
    </a>
  </Link>
);

export default ProfileNavigationLayout;
