import Router, { useRouter } from "next/router";
import { useAuthContext } from "../utils/Context/AuthContext";

const Profile = () => {
  const { isAuth } = useAuthContext();
  const router = useRouter();

  if (!isAuth) {
    router.push("/Login");
    return null;
  }

  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

export default Profile;
