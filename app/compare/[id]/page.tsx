import RouterBack from "@/app/components/RouterBack";
import prisma from "@/app/lib/prismadb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scoreParse } from "@/lib/calculatePoints";
import ReplayItem from "./components/ReplayItem";

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
        <div className=" flex flex-row justify-between h-full w-full">
          <ReplayItem replay={replay1!} />
          <ReplayItem replay={replay2!} />
        </div>
        <div className="flex relative flex-col w-full border">
          <div className="flex w-full border-b relative  items-center justify-evenly">
            <p className="absolute left-0 ml-2 hidden md:block">Total</p>
            <p className="w-1/3 flex justify-center">
              {Number(replay1.score).toLocaleString()}
            </p>
            <p className="w-1/3 flex border-l py-1 border-r justify-center">
              {Number(replay1.score! - replay2.score!).toLocaleString()}
            </p>
            <p className="w-1/3 flex justify-center">
              {Number(replay2.score).toLocaleString()}
            </p>
          </div>
          {filledArray1.map((score, idx) => {
            return (
              <div
                key={score}
                className={`flex relative w-full items-center ${
                  idx === filledArray1.length - 1 ? "" : "border-b"
                } justify-evenly `}
              >
                <p className="absolute left-0 ml-2 hidden md:block">
                  Stage {idx + 1}
                </p>
                <p className="w-1/3 flex justify-center">
                  {Number(score).toLocaleString()}
                </p>
                <p className="w-1/3 flex border-r py-1 border-l justify-center">
                  {Number(diffArray[idx]).toLocaleString()}
                </p>
                <p className="w-1/3 flex justify-center">
                  {Number(filledArray2[idx]).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
