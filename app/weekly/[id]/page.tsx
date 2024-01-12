import RouterBack from "@/app/components/RouterBack";
import prisma from "@/app/lib/prismadb";
import { resultsElement } from "@/app/lib/weeklyChallActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertUnixDate } from "@/lib/getRankingData";
import Link from "next/link";

export default async function Weekly({ params }: { params: { id: string } }) {
  const weekly = await prisma.weeklyChallenge.findFirst({
    where: {
      challengeID: params.id,
    },
  });
  if (!weekly) {
    return <div>xD</div>;
  }
  const results: resultsElement[] = JSON.parse(weekly.results!);
  const sortedReplays = [...results].sort(
    (a, b) => b.replayPoints! - a.replayPoints!
  );
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <div className="space-y-1">
            <CardTitle>Weekly:&nbsp;{weekly.challengeID}</CardTitle>
            {weekly.desc ? (
              <CardDescription>Description: {weekly.desc}</CardDescription>
            ) : null}
          </div>
          <div className="flex flex-col gap-y-1">
            <RouterBack />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between font-semibold">
          <div className="gap-y-2 flex-grow">
            <p>Start: {convertUnixDate(weekly.dateStart as any)}</p>
            <p>End: {convertUnixDate(weekly.dateEnd as any)}</p>
            <p>Game: {weekly.game}</p>
            <p>Rank: {weekly.rank}</p>
            <p>Ended: {weekly.ended ? "True" : "False"}</p>
          </div>
          <div className="space-y-2 flex-grow">
            <p className="text-center">Current ranking:</p>
            {sortedReplays.map((user) => (
              <Link
                href={`/replay/${user.replay}`}
                key={user.userID}
                prefetch={false}
                className="flex items-center gap-x-2 relative border p-2 rounded-md hover:bg-secondary transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user.userImg || "/images/placeholder.jpg"}
                    alt="avatar"
                  />
                  <AvatarFallback>:3</AvatarFallback>
                </Avatar>
                <p>{user.userNickname}</p>
                <p className="absolute right-0 pr-2">{user.replayPoints}</p>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
