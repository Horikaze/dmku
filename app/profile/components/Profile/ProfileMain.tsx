import { getCurrentUserServer } from "@/app/actions/getCurrentUserServer";
import ProfileSideLeft from "./ProfileSideLeft";

export default async function ProfileMain() {
  const user = await getCurrentUserServer();
  console.log(user);
  return (
    <div className="flex flex-row h-full w-full">
      <ProfileSideLeft />
    </div>
  );
}
