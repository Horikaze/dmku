import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import ProfileBanner from "./content/components/ProfileBanner";
import ProfileContent from "./content/ProfileContent";

export default async function ProfileMain() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col h-full mx-2 md:mx-4 lg:mx-20 2xl:mx-32 pb-20">
      <ProfileBanner session={session!} />
      <ProfileContent />
    </div>
  );
}
