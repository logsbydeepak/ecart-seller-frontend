import Link from "next/link";

const NoAuthNavbarItem = () => {
  return (
    <div className="flex">
      <Link href="/Login">
        <a>Login</a>
      </Link>
      <Link href="/SignUp">
        <a>SignUp</a>
      </Link>
    </div>
  );
};
export default NoAuthNavbarItem;
