import RouterBack from "@/app/components/RouterBack";
import prisma from "@/app/lib/prismadb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getCharacterFromData,
  getCharacterFromDataWithoutType,
  getDateFromReplay,
  getGameString,
} from "@/lib/getRankingData";
import Link from "next/link";

export default async function page({ params }: { params: { id: string } }) {
  const replay = await prisma.replay.findFirst({
    where: {
      replayId: params.id,
    },
  });
  if (!replay) {
    return "XD";
  }

  const scoreParse = () => {
    if (replay?.stage_score?.includes("+")) {
      const scoreParts = replay.stage_score.split("+");
      return scoreParts;
    }
  };
  const chara =
    replay.game === 9
      ? getCharacterFromDataWithoutType(replay.character!)
      : getCharacterFromData(replay.character!, replay.shottype!) || "";

  const score = scoreParse();
  console.log(replay);
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <div className="space-y-1">
            <CardTitle>{replay?.rpy_name}</CardTitle>
            <CardDescription>Replay ID: {params.id}</CardDescription>
            <CardDescription>User ID: {replay.userId}</CardDescription>
          </div>
          <div>
            <RouterBack />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col">
        <div className="flex flex-col gap-y-2">
          <div className="font-semibold">
            Player -{" "}
            <span className="font-normal text-gray-400">{replay?.player}</span>
          </div>
          <div className="font-semibold">
            Game -{" "}
            <span className="font-normal text-gray-400">
              Touhou: {getGameString(replay.game!)}
            </span>
          </div>
          <div>
            Character -{" "}
            <span className="font-normal text-gray-400">{chara}</span>
          </div>
          <div>
            Rank -{" "}
            <span className="font-normal text-gray-400">{replay?.rank}</span>
          </div>
          <div>
            Slow rate -{" "}
            <span className="font-normal text-gray-400">
              {replay?.slowRate}
            </span>
          </div>
          <div>
            Achievement -{" "}
            <span className="font-normal text-gray-400">
              {replay?.achievement}
            </span>
          </div>
          <div>
            Stage -{" "}
            <span className="font-normal text-gray-400">
              {replay.stage || "Not supported"}
            </span>
          </div>
          <div>
            Added -{" "}
            <span className="font-normal text-gray-400">
              {getDateFromReplay(replay.uploadedDate!)}
            </span>
          </div>
          <div>
            Replay Date -{" "}
            <span className="font-normal text-gray-400">
              {getDateFromReplay(replay.fileDate!)}
            </span>
          </div>
          <div>
            Points -{" "}
            <span className="font-normal text-gray-400">{replay?.points}</span>
          </div>
          <div>
            Status -{" "}
            <span className="font-normal text-gray-400">{replay?.status}</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <div>
              Score -{" "}
              <span className="font-normal text-gray-400">
                {Number(replay.score).toLocaleString()}{" "}
                {replay?.stage_score?.includes("+") ? ":" : null}
              </span>
            </div>
            <div className="flex flex-wrap">
              {replay?.stage_score?.includes("+")
                ? score?.map((score, index) => (
                    <div key={score}>
                      <div className="p-2 items-center text-sm flex flex-col gap-y-1">
                        <p>{`Stage ${index + 1}`}</p>
                        <p>{Number(score).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          {replay?.comment!.length > 3 ? (
            <div>
              Comment -{" "}
              <span className="font-normal text-gray-400">
                {replay?.comment}
              </span>
            </div>
          ) : null}
          {replay?.videoLink ? (
            <div>
              Video -{" "}
              <Link
                className="font-normal text-gray-400 underline"
                href={replay?.videoLink}
                target="_blank"
              >
                {replay?.videoLink}
              </Link>
            </div>
          ) : null}
          <div>
            <Link className="underline" href={replay.filePath!} download>
              Download rpy
            </Link>{" "}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
