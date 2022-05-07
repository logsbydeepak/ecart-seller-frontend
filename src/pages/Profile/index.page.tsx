import {
  ChevronRightIcon,
  LogoutIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useImmer } from "use-immer";
import { FC, ReactNode } from "react";

import Spinner from "~/components/Spinner";
import { NextPageLayoutType } from "~/types/nextMod";
import { classNames } from "~/utils/helper/tailwind";
import ProfileNavigationLayout from "~/layout/ProfileNavigation";
import GetUserQuery from "~/utils/gql/User/GetUser.gql";
import useAuthRequestHook from "~/hooks/useAuthRequestHook";
import Image from "next/image";

const Account: NextPageLayoutType = () => {
  const [requestStatus, setRequestStatus] = useImmer({
    isLoading: true,
    isError: false,
    isSuccess: false,
  });

  const [userInfo, setUserInfo] = useImmer({ name: "", email: "" });

  const onSuccess = (data: any) => {
    const readUser = data.readUser;
    const typename = readUser.__typename;

    if (typename === "User") {
      setRequestStatus((draft) => {
        draft.isSuccess = true;
        draft.isLoading = false;
      });

      setUserInfo((draft) => {
        draft.name = readUser.name;
        draft.email = readUser.email;
      });
    }
  };

  const { isLoading, isError, isSuccess } = useAuthRequestHook({
    key: "User info",
    name: "readUser",
    query: GetUserQuery,
    option: {
      onSuccess,
    },
  });

  return (
    <>
      <div className="text-center font-normal">
        <h1 className="mb-2 text-3xl">Account Info</h1>
        <p className="">Manage you account basic info</p>
      </div>

      {isLoading && <LoadingUserInfo />}
      {isError && <ErrorText />}
      {isSuccess && <UserInfo name={userInfo.name} email={userInfo.email} />}
    </>
  );
};

const ErrorText: FC = () => (
  <p className="p-20 pb-4 text-center text-red-500">Something went wrong</p>
);

const LoadingUserInfo: FC = () => (
  <div className="flex flex-col items-center justify-center p-20">
    <Spinner className="h-12 w-12 text-neutral-900" />
  </div>
);

const UserInfo: FC<{ name: string; email: string }> = ({ name, email }) => {
  const image =
    "https://images.unsplash.com/photo-1637633198300-08beaec68c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80";

  return (
    <>
      <BorderBox
        title="Basic Info"
        subTitle="All the info required your current Password"
      >
        <TextKeyImageValueInformation keyText="PHOTO" valueImageUrl={image} />
        <Divider />
        <TextKeyValueInformation keyText="NAME" valueText={name} />
        <Divider />
        <TextKeyValueInformation keyText="EMAIL" valueText={email} />
        <Divider />
        <TextKeyValueInformation keyText="PASSWORD" valueText="*******" />
      </BorderBox>

      <BorderBox
        title="Danger Zone"
        subTitle="Danger Zone double check what you select"
        className="mt-24"
      >
        <IconKeyTextValueInformation
          keyIcon={<LogoutIcon />}
          valueText="Logout All"
        />
        <Divider />
        <IconKeyTextValueInformation
          keyIcon={<TrashIcon />}
          valueText="Delete Account"
        />
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
      "mt-20 rounded-md border-2  border-neutral-200 font-normal"
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

const TextKey: FC<{ text: string }> = ({ text }) => (
  <h3 className="text-xs font-medium">{text}</h3>
);

const TextValue: FC<{ text: string }> = ({ text }) => <h4>{text}</h4>;

const IconKey: FC<{ Icon: ReactNode }> = ({ Icon }) => (
  <div className="h-5 w-5">{Icon}</div>
);

const ImageValue: FC<{ imageUrl: string }> = ({ imageUrl }) => (
  <div className="h-24 w-24 rounded-full border-2 border-neutral-300 p-1">
    <Image
      src={imageUrl}
      alt="profile"
      width="96"
      height="96"
      className="cover rounded-full	object-cover "
    />
  </div>
);

const BaseInformationContainer: FC<{
  keyContainer: ReactNode;
  valueContainer: ReactNode;
}> = ({ keyContainer, valueContainer }) => (
  <button className="flex w-full items-center py-5 px-6 text-left hover:bg-neutral-100">
    <div className="w-48">{keyContainer}</div>
    <div>{valueContainer}</div>
    <div className="ml-auto">
      <ChevronRightIcon className="w-5" />
    </div>
  </button>
);

const TextKeyValueInformation: FC<{ keyText: string; valueText: string }> = ({
  keyText,
  valueText,
}) => (
  <BaseInformationContainer
    keyContainer={<TextKey text={keyText} />}
    valueContainer={<TextValue text={valueText} />}
  />
);

const IconKeyTextValueInformation: FC<{
  keyIcon: ReactNode;
  valueText: string;
}> = ({ keyIcon, valueText }) => (
  <BaseInformationContainer
    keyContainer={<IconKey Icon={keyIcon} />}
    valueContainer={<TextValue text={valueText} />}
  />
);

const TextKeyImageValueInformation: FC<{
  keyText: string;
  valueImageUrl: string;
}> = ({ keyText, valueImageUrl }) => (
  <BaseInformationContainer
    keyContainer={<TextKey text={keyText} />}
    valueContainer={<ImageValue imageUrl={valueImageUrl} />}
  />
);

Account.getLayout = ProfileNavigationLayout;

export default Account;
