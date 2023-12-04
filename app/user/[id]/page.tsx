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
    return (
      <div>
        <p>xD</p>
      </div>
    );
  }
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
          <div className="flex flex-col items-end m-3 justify-between">
            <RouterBack />
            <div className="flex flex-row gap-y-2 h-full items-end gap-x-1">
              <div>
                <p>Join date</p>
                <p>Discord </p>
                <p>Favorite Game </p>
              </div>
              <div>
                <p>-</p>
                <p>-</p>
                <p>-</p>
              </div>
              <div className="flex flex-col items-end">
                <p> {getDateFromReplay(user.joindate as any)}</p>
                <p> {user.discord || "not set"}</p>
                <p> {user.favoriteGame || "not set"}</p>
              </div>
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
      <CCTable tableData={user.CCTable!} />
      <DataTable columns={columns} data={user.Replays!} />
    </div>
  );
}
