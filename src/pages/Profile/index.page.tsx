import {
  ChevronRightIcon,
  LogoutIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { FC, ReactNode } from "react";

import { classNames } from "~/utils/helper/tailwind";
import { NextPageLayoutType } from "~/types/nextMod";
import ProfileNavigationLayout from "~/layout/ProfileNavigation";

const Account: NextPageLayoutType = () => {
  const image =
    "https://images.unsplash.com/photo-1637633198300-08beaec68c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80";

  return (
    <>
      <div className="mt-8 mb-16 text-center font-normal">
        <h1 className="mb-2 text-3xl">Account Info</h1>
        <p className="">Manage you account basic info</p>
      </div>

      <BorderBox
        title="Basic Info"
        subTitle="All the info required your current Password"
      >
        <InfoImage fieldKey="Photo" image={image} />
        <Divider />
        <InfoText fieldKey="NAME" value="Test Name" />
        <Divider />
        <InfoText fieldKey="EMAIL" value="example@abc.com" />
        <Divider />
        <InfoText fieldKey="PASSWORD" value="*******" />
      </BorderBox>

      <BorderBox
        title="Danger Zone"
        subTitle="Danger Zone double check what you select"
        className="mt-24"
      >
        <InfoTextIcon fieldKey="Logout All" Icon={<LogoutIcon />} />
        <Divider />
        <InfoTextIcon fieldKey="Delete Account" Icon={<TrashIcon />} />
      </BorderBox>
    </>
  );
};

const BorderBox: FC<{
  title: string;
  subTitle: string;
  children: ReactNode;
  className?: string;
}> = ({ title, subTitle, children, className }) => (
  <div
    className={classNames(
      className,
      "rounded-md border-2 border-neutral-200  font-normal"
    )}
  >
    <div className="py-5 pl-6">
      <h1 className="mb-1 text-2xl">{title}</h1>
      <p className="text-sm">{subTitle}</p>
    </div>
    {children}
  </div>
);

const Divider: FC = () => (
  <div className="w-full border-b-2  border-neutral-200"></div>
);

const InfoText: FC<{ fieldKey: string; value: string }> = ({
  fieldKey,
  value,
}) => (
  <button className="flex w-full items-center py-5 px-6 text-left">
    <div className="w-48">
      <h3 className="text-xs font-medium">{fieldKey}</h3>
    </div>
    <div>
      <h4>{value}</h4>
    </div>
    <div className="ml-auto">
      <ChevronRightIcon className="w-5" />
    </div>
  </button>
);

const InfoTextIcon: FC<{ fieldKey: string; Icon: ReactNode }> = ({
  fieldKey,
  Icon,
}) => (
  <button className="flex w-full items-center py-5 px-6 text-left">
    <div className="w-48">
      <div className="h-5 w-5">{Icon}</div>
    </div>
    <div>
      <h4>{fieldKey}</h4>
    </div>
    <div className="ml-auto">
      <ChevronRightIcon className="w-5" />
    </div>
  </button>
);

const InfoImage: FC<{ fieldKey: string; image: string }> = ({
  fieldKey,
  image,
}) => (
  <button className="flex w-full items-center py-5 px-6 text-left">
    <div className="w-48">
      <h3 className="text-xs font-medium">{fieldKey}</h3>
    </div>
    <div>
      <img
        src={image}
        alt="profile"
        className="cover h-24 w-24 rounded-full	border-2 object-cover p-1"
      />
    </div>
    <div className="ml-auto">
      <ChevronRightIcon className="w-5" />
    </div>
  </button>
);

Account.getLayout = ProfileNavigationLayout;

export default Account;
