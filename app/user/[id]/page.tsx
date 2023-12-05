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
      <Card
        style={{
          backgroundImage: `url(${user.profileBanner})`,
        }}
        className="bg-cover"
      >
        <div className="flex  transition-all text-sm md:text-base justify-around rounded-md">
          <div className="flex justify-between w-full">
            <div className="flex w-1/3 rounded-md p-3 items-center flex-col gap-y-2 m-3">
              <div className=" bg-secondary/60 rounded-md p-3 w-full flex flex-col items-center  gap-y-2 m-3">
                <Avatar className="h-20 w-20 md:h-24 md:w-24 ">
                  <AvatarImage src={user.imageUrl!} alt="avatar" />
                  <AvatarFallback>:3</AvatarFallback>
                </Avatar>
                <p>{user.nickname}</p>
                <div className="flex flex-col w-full items-start">
                  <p>CC amount - {user.CCCount}</p>
                  <p>Points amount - {user.points}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end m-3 justify-between">
              <div className="bg-secondary/60 rounded-md">
                <RouterBack />
              </div>
              <div className="flex flex-row gap-y-2 items-end">
                <div className="bg-secondary/60 p-3 rounded-l-md">
                  <p>Join date -</p>
                  <p>Discord -</p>
                  <p>Favorite Game -</p>
                </div>
                <div className="flex flex-col items-end bg-secondary/60 p-3 rounded-r-md">
                  <p> {getDateFromReplay(user.joindate as any)}</p>
                  <p> {user.discord || "-"}</p>
                  <p> {user.favoriteGame || "-"}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              textOrientation: "sideways",
              writingMode: "vertical-rl",
            }}
            className="opacity-60 text-center text-xs hover:py-12 md:hover:py-24 xl:hover:py-32 2xl:hover:py-56 transition-all"
          >
            Expand image
          </div>
        </div>
        {user.bio ? (
          <div className="w-full p-5">
            <p>
              Bio: <span className="text-sm  0">{user.bio}</span>
            </p>
          </div>
        ) : null}
      </Card>
      <CCTable tableData={user.CCTable!} />
      <DataTable columns={columns} data={user.Replays!} />
    </div>
  );
}
