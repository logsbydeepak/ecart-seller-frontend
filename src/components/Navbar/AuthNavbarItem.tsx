import Image from "next/image";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import { FC, ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CogIcon, LogoutIcon } from "@heroicons/react/outline";

import { gqlRequest } from "~/utils/helper/gql";
import { classNames } from "~/utils/helper/tailwind";
import { useAuthContext } from "~/context/AuthContext";
import LogoutModal from "~/components/Modal/LogoutModal";
import { useNotificationContext } from "~/context/NotificationContext";
import ReadUserFirstNameAndPictureQuery from "~/utils/gql/User/ReadUserFirstNameAndPicture.gql";

const defaultData = {
  name: "UserName",
  picture:
    "https://images.unsplash.com/photo-1637633198300-08beaec68c70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
};

const readUserPictureRequest = async (authToken: string) => {
  try {
    const request = await gqlRequest({
      query: ReadUserFirstNameAndPictureQuery,
      token: authToken,
    });

    const typeName = request.readUser.__typename;

    if (typeName === "User") {
      return request;
    }

    throw { data: request };
  } catch (error: any) {
    if (error.data) {
      throw error.data;
    }

    throw { data: null };
  }
};

const AuthNavbarItem: FC = () => {
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const [userInfo, setUserInfo] = useState(defaultData);
  const router = useRouter();
  const { addNotification } = useNotificationContext();

  const { authToken, setAuthToken } = useAuthContext();

  const onSuccess = (data: any) => {
    const requestData = data.readUser;
    setUserInfo({
      name: requestData.firstName,
      picture: requestData.picture,
    });
  };

  const onError = (data: any) => {
    console.log(data);
    const requestData = data.readUser;

    if (["TOKEN_PARSE", "AUTHENTICATION"].includes(requestData.title)) {
      addNotification("error", "User Logout");
      setAuthToken("");
      return;
    }

    addNotification("error", "Something went wrong!");
  };

  const { isLoading, isError } = useQuery(
    "read user name and picture",
    () => readUserPictureRequest(authToken),
    {
      onSuccess,
      onError,
    }
  );

  if (isLoading || isError) {
    return (
      <div className="h-9 w-32 animate-pulse rounded-md bg-neutral-100"></div>
    );
  }

  return (
    <div className="relative">
      <LogoutModal
        isOpen={isOpenLogoutModal}
        setIsOpen={setIsOpenLogoutModal}
      />
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="flex items-center rounded-md px-3 py-2 hover:bg-neutral-100">
              <Image
                src={defaultData.picture}
                alt="picture"
                width="28"
                height="28"
                className="rounded-full object-cover "
              />
              <p className="max-w-[100px] overflow-hidden text-ellipsis pl-2 font-medium">
                {userInfo.name}
              </p>
            </Menu.Button>

            <AnimatePresence>
              {open && (
                <Menu.Items
                  static
                  as={motion.div}
                  key="menu"
                  initial={{ x: 150 }}
                  animate={{ x: 0 }}
                  exit={{ x: 150 }}
                  className="absolute right-0 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem
                    text="Account"
                    Icon={<CogIcon />}
                    onClick={() => router.push("/Account")}
                  />
                  <MenuItem
                    text="Logout"
                    Icon={<LogoutIcon />}
                    onClick={() => setIsOpenLogoutModal(true)}
                  />
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </div>
  );
};

const MenuItem: FC<{ text: string; Icon: ReactNode; onClick: () => void }> = ({
  text,
  Icon,
  onClick,
}) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={classNames(
            active && "bg-neutral-100",
            "flex w-full cursor-pointer items-center px-4 py-2"
          )}
        >
          <div className="text-black-500 mr-2 flex h-7 w-7 items-center justify-center">
            <div className="h-5 w-5 text-neutral-600">{Icon}</div>
          </div>
          <p>{text}</p>
        </button>
      )}
    </Menu.Item>
  );
};

export default AuthNavbarItem;
