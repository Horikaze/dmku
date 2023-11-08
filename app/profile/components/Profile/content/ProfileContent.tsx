import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import ProfileBanner from "./components/ProfileBanner";

export default async function ProfileContent() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex w-full flex-col">
      <ProfileBanner session={session!} />
      <p className="p-10 text-white">MainContetnt</p>
    </div>
  );
}
