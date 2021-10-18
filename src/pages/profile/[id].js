import { useRouter } from "next/dist/client/router";

const Profile = () => {
  const router = useRouter();

  const data = router.query.id;
  console.log(data);

  return <h1>Profile</h1>;
};

export default Profile;
