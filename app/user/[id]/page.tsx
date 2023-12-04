import CCTable from "@/app/components/CCTable";
import RouterBack from "@/app/components/RouterBack";
import { columns } from "@/app/components/replayTable/columns";
import { DataTable } from "@/app/components/replayTable/data-table";
import prisma from "@/app/lib/prismadb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getDateFromReplay } from "@/lib/getRankingData";

export default async function User({ params }: { params: { id: string } }) {
  const user = await prisma.profile.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!user) {
    return (
      <div>
        <p>xD</p>
      </div>
    );
  }
  const replays = await prisma.replay.findMany({
    take: 20,
    orderBy: {
      acceptedBy: "desc",
    },
    where: {
      userId: params.id,
    },
  });
  const tableData = await prisma.ranking.findFirst({
    where: {
      userIdRankingPoints: params.id,
    },
  });
  return (
    <div className="flex flex-col gap-y-4">
      <Card>
        <div className="flex justify-between gap-2  rounded-lg p-2 ">
          <div className="flex w-1/3 items-center flex-col gap-y-2 m-3">
            <Avatar className="h-20 w-20 md:h-24 md:w-24">
              <AvatarImage src={user.imageUrl!} alt="avatar" />
              <AvatarFallback>:3</AvatarFallback>
            </Avatar>
            <p className="font-semibold">{user.nickname}</p>
            <div className="flex flex-col w-full items-start">
              <p>
                CC amount -{" "}
                <span className="font-normal text-gray-400">
                  {user.CCCount}
                </span>
              </p>
              <p>
                Points amount -{" "}
                <span className="font-normal text-gray-400">{user.points}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end m-3">
            <RouterBack />
            <div className="flex flex-col gap-y-2 h-full justify-end">
              <p>
                Join date -{" "}
                <span className="font-normal text-gray-400">
                  {getDateFromReplay(user.joindate as any)}
                </span>
              </p>
              <p>
                Discord -{" "}
                <span className="font-normal text-gray-400">
                  {user.discord || "not set"}
                </span>
              </p>
              <p>
                Favorite Game -{" "}
                <span className="font-normal text-gray-400">
                  {user.favoriteGame || "not set"}
                </span>
              </p>
              <p>
                Favorite Game -{" "}
                <span className="font-normal text-gray-400">
                  {user.favoriteGame || "not set"}
                </span>
              </p>
            </div>
          </div>
        </div>
        {user.bio ? (
          <div className="w-full p-5">
            <p>
              Bio: <span className="text-sm text-gray-400">{user.bio}</span>
            </p>
          </div>
        ) : null}
      </Card>
      <div>
        <DataTable columns={columns} data={replays!} />
      </div>
      <CCTable tableData={tableData!} />
    </div>
  );
}
