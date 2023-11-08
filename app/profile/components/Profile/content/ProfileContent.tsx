import { getServerSession } from "next-auth";
import ProfileBanner from "./components/ProfileBanner";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "../../LogoutButton";

export default async function ProfileContent() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex w-full h-full flex-col">
      <ProfileBanner session={session!} />
      <LogoutButton />
      <p className="p-10 text-white">MainContetnt</p>
    </div>
  );
}
