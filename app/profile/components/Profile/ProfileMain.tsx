import { getSession } from "next-auth/react";
import ProfileSideLeft from "./ProfileSideLeft";

export default async function ProfileMain() {
  return (
    <div className="flex flex-row h-full w-full">
      <ProfileSideLeft />
    </div>
  );
}
