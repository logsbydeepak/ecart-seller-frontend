import { PropsWithChildren } from "react";
import Link from "next/link";

interface Props extends PropsWithChildren {
  title: string;
  subTitle: string;
  subTitleLinkText: string;
  subTitleLink: string;
}

const LoginAndSignUpContainer = ({
  children,
  title,
  subTitle,
  subTitleLink,
  subTitleLinkText,
}: Props) => {
  return (
    <div className="flex flex-col items-center	justify-center py-20">
      <div className="rounded-lg border-2 px-10 py-16 ">
        <h1 className="pb-4 text-center text-4xl font-bold text-slate-900 ">
          {title}
        </h1>
        <p className="mb-8 text-center">
          {subTitle}
          <Link href={subTitleLink}>
            <a className="ml-2 text-indigo-600 hover:text-indigo-500 hover:underline">
              {subTitleLinkText}
            </a>
          </Link>
        </p>

        <div className="w-96">{children}</div>
      </div>
    </div>
  );
};

export default LoginAndSignUpContainer;
