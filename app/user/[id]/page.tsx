import CCTable from "@/app/components/CCTable";
import ProfileHeader from "@/app/components/ProfileHeader";
import RouterBack from "@/app/components/RouterBack";
import { columns } from "@/app/components/replayTable/columns";
import { DataTable } from "@/app/components/replayTable/data-table";
import prisma from "@/app/lib/prismadb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getDateFromReplay } from "@/lib/getRankingData";
import { notFound } from "next/navigation";

export default async function User({ params }: { params: { id: string } }) {
  const user = await prisma.profile.findFirst({
    where: {
      id: params.id,
    },
    include: {
      Replays: {
        take: 20,
        orderBy: {
          uploadedDate: "desc",
        },
      },
      CCTable: true,
    },
  });

  if (!user) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-y-4">
      <ProfileHeader user={user} />
      <CCTable tableData={user.CCTable!} />
      <DataTable columns={columns} data={user.Replays!} />
    </div>
  );
}
