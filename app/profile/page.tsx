import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import CCTable from "../components/CCTable";
import ProfileHeader from "../components/ProfileHeader";
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
console.log(user?.CCTable);
  return (
    <div className="w-full flex flex-col gap-y-3">
      <ProfileHeader user={user!} />
      <CCTable tableData={user?.CCTable!} />
    </div>
  );
}
