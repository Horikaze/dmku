import LogoutButton from "../LogoutButton";
import UserInfoBox from "./UserInfoBox";

export default async function ProfileSideLeft() {
  return (
    <div className="h-full w-96 bg-gray-700">
      <UserInfoBox />
      <LogoutButton />
    </div>
  );
}
