import RouterBack from "@/app/components/RouterBack";
import prisma from "@/app/lib/prismadb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scoreParse } from "@/lib/calculatePoints";
import ReplayItem from "./components/ReplayItem";
import { ReplayScores } from "./components/ReplayScores";
import { max } from "date-fns";

export default async function Page({
  searchParams,
}: {
  searchParams: { replay1: string; replay2: string };
}) {
  const replay1 = await prisma.replay.findFirst({
    where: {
      replayId: searchParams.replay1,
    },
  });
  const replay2 = await prisma.replay.findFirst({
    where: {
      replayId: searchParams.replay2,
    },
  });
  if (!replay1 || !replay2) {
    return (
      <div>
        <p>xD</p>
      </div>
    );
  }

  const score1 = scoreParse(replay1);
  const score2 = scoreParse(replay2);

  const maxLength = Math.max(score1!.length, score2!.length);
  const filledArray1 = score1!.concat(
    Array(maxLength - score1!.length).fill("0")
  );
  const filledArray2 = score2!.concat(
    Array(maxLength - score2!.length).fill("0")
  );

  const diffArray = filledArray1.map(
    (value, index) => parseInt(value) - parseInt(filledArray2[index])
  );

  return (
    <Card className="text-sm md:text-base">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <div className="space-y-1">
            <CardTitle>Compare</CardTitle>
          </div>
          <div className="flex flex-col gap-y-1">
            <RouterBack />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <div className=" flex flex-row justify-around h-full w-full">
          <ReplayItem replay={replay1!} />
          <div className=" gap-y-2 flex items-center flex-col justify-between">
            <div>Difference</div>
            <div className="mb-7 md:mb-8 flex flex-col items-center">
              <p className="py-7">
                {(replay1.points! - replay2.points!).toLocaleString()}
              </p>
              <p>{(replay1.score! - replay2.score!).toLocaleString()}</p>
            </div>
          </div>
          <ReplayItem replay={replay2!} />
        </div>

        <div className=" flex justify-around">
          <ReplayScores replay={replay1} score={score1!} />
          <div className="p-2 items-center text-sm flex flex-col gap-y-1">
            {diffArray.map((diff) => (
              <div key={diff} className="py-[18px]">
                <p>{diff.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <ReplayScores replay={replay2} score={score2!} />
        </div>
      </CardContent>
    </Card>
  );
}
