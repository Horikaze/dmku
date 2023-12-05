import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prismadb";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import ProfileHeader from "../components/ProfileHeader";
import CCTable from "../components/CCTable";
export default async function MainPage() {
  const session = await getServerSession(authOptions);
  const user = await prisma.profile.findFirst({
    where: {
      id: session?.user.info.id,
    },
    include: {
      CCTable: true,
    },
  });
  return (
    <div className="w-full flex flex-col gap-y-3">
      <ProfileHeader user={user!} />
      <CCTable tableData={user?.CCTable!} />
    </div>
  );
}
