import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/app/lib/prismadb";
import Link from "next/link";
export default async function MiddleComp() {
  const latestUser = await prisma.profile.findFirst({
    orderBy: {
      joindate: "desc",
    },
  });
  const latestReplay = await prisma.replay.findFirst({
    orderBy: {
      uploadedDate: "desc",
    },
  });
  const latestReplayUser = await prisma.profile.findFirst({
    where: {
      id: latestReplay?.userId!,
    },
    select: {
      nickname: true,
    },
  });
  console.log(latestReplay);
  return (
    <div className="flex md:flex-col gap-y-2 flex-grow px-6 max-w-[400px] w-full">
      {latestUser ? (
        <div className="flex flex-col gap-y-2 w-full">
          <p className="text-lg font-semibold text-center">Lastest user</p>
          <Link
            href={`/user/${latestUser?.id}`}
            prefetch={false}
            className="flex gap-x-2 items-center hover:bg-secondary/60 transition-colors p-2 rounded-lg"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={latestUser!.imageUrl || "/images/placeholder.jpg"}
                alt="avatar"
              />
              <AvatarFallback>:3</AvatarFallback>
            </Avatar>
            <p>{latestUser?.nickname}</p>
          </Link>
        </div>
      ) : null}
      {latestReplay ? (
        <div className="flex flex-col gap-y-2 w-full">
          <p className="text-lg font-semibold text-center">Lastest replay</p>
          <Link
            href={`/replay/${latestReplay?.replayId}`}
            className="flex flex-col gap-x-2 items-start hover:bg-secondary/60 transition-colors p-2 rounded-lg"
          >
            <p>Touhou: {latestReplay?.game}</p>
            <p>Score: {latestReplay?.score?.toLocaleString()}</p>
            <p>By: {latestReplayUser?.nickname}</p>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
