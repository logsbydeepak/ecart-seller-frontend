import { Tab } from "@headlessui/react";
import {
  TrashIcon,
  LogoutIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { useAuthContext } from "../utils/Context/AuthContext";

const Profile = () => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  const image =
    "https://images.unsplash.com/photo-1637633198300-08beaec68c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80";

  return (
    <Tab.Group as="div" className="flex">
      <Tab.List as="div" className="w-64">
        <Tab as="button">Account</Tab>
      </Tab.List>
      <Tab.Panels as="div" className="w-full">
        <Tab.Panel as="div" className="mb-20 max-w-4xl">
          <div className="mt-8 mb-16 text-center font-normal">
            <h1 className="mb-2 text-3xl">Account Info</h1>
            <p className="dark:text-neutral-300">
              Manage you account basic info
            </p>
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
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

const BorderBox: FC<{
  title: string;
  subTitle: string;
  children: ReactNode;
  className?: string;
}> = ({ title, subTitle, children, className }) => (
  <div
    className={
      className +
      " " +
      "rounded-md border-2 border-neutral-200  font-normal dark:border-neutral-700"
    }
  >
    <div className="py-5 pl-6">
      <h1 className="mb-1 text-2xl">{title}</h1>
      <p className="text-sm dark:text-neutral-300">{subTitle}</p>
    </div>
    {children}
  </div>
);

const Divider: FC = () => (
  <div className="w-full border-b-2  border-neutral-200 dark:border-neutral-700"></div>
);

const InfoText: FC<{ fieldKey: string; value: string }> = ({
  fieldKey,
  value,
}) => (
  <button className="flex w-full items-center py-5 px-6 text-left hover:dark:bg-neutral-800">
    <div className="w-48 dark:text-neutral-400">
      <h3 className="text-xs font-medium">{fieldKey}</h3>
    </div>
    <div>
      <h4>{value}</h4>
    </div>
    <div className="ml-auto">
      <ChevronRightIcon className="w-5 dark:text-neutral-400" />
    </div>
  </button>
);

const InfoTextIcon: FC<{ fieldKey: string; Icon: ReactNode }> = ({
  fieldKey,
  Icon,
}) => (
  <button className="flex w-full items-center py-5 px-6 text-left hover:dark:bg-neutral-800">
    <div className="w-48 dark:text-neutral-400">
      <div className="h-5 w-5">{Icon}</div>
    </div>
    <div>
      <h4>{fieldKey}</h4>
    </div>
    <div className="ml-auto">
      <ChevronRightIcon className="w-5 dark:text-neutral-400" />
    </div>
  </button>
);

const InfoImage: FC<{ fieldKey: string; image: string }> = ({
  fieldKey,
  image,
}) => (
  <button className="flex w-full items-center py-5 px-6 text-left hover:dark:bg-neutral-800">
    <div className="w-48 dark:text-neutral-400">
      <h3 className="text-xs font-medium">{fieldKey}</h3>
    </div>
    <div>
      <img
        src={image}
        alt=""
        className="cover h-24 w-24 rounded-full	border-2 object-cover p-1 dark:border-indigo-200"
      />
    </div>
    <div className="ml-auto">
      <ChevronRightIcon className="w-5 dark:text-neutral-400" />
    </div>
  </button>
);

export default Profile;
