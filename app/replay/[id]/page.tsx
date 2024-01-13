import RouterBack from "@/app/components/RouterBack";
import prisma from "@/app/lib/prismadb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { scoreParse } from "@/lib/calculatePoints";
import {
  getCCstring,
  getCharacterFromData,
  getCharacterFromDataWithoutType,
  getDateFromReplay,
  getGameString,
} from "@/lib/getRankingData";
import Link from "next/link";
import CompareButton from "./CompareButton";
import Image from "next/image";
import { bgImages } from "@/app/constants/bg-images";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const replay = await prisma.replay.findFirst({
    where: {
      replayId: params.id,
    },
  });
  if (!replay) {
    notFound();
  }

  const chara =
    replay.game === 9
      ? getCharacterFromDataWithoutType(replay.character!)
      : getCharacterFromData(replay.character!, replay.shottype!) || "";

  const score = scoreParse(replay);
  return (
    <Card className="relative font-semibold">
      <Image
        src={bgImages[replay.game!]}
        alt="gameBg"
        fill
        className="absolute opacity-100 z-0 object-cover object-center h-full gradImage"
      />
      <div className="relative z-10 bg-secondary/60">
        <CardHeader>
          <div className="flex flex-row justify-between">
            <div className="space-y-1">
              <CardTitle>{replay?.rpy_name}</CardTitle>
              <CardDescription>Replay ID: {params.id}</CardDescription>
              <CardDescription>
                <Link href={`/user/${replay.userId}`} prefetch={false}>
                  User ID: {replay.userId}
                </Link>
              </CardDescription>
            </div>
            <div className="flex flex-col gap-y-1">
              <div className="flex justify-end">
                <RouterBack />
              </div>
              <CompareButton replay={replay} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-y-2 flex-col self-start p-2 bg-secondary/60 rounded-md">
              <div className="self-start">Player - {replay?.player}</div>
              <div className="self-start">
                Game - Touhou: {getGameString(replay.game!)}
              </div>
              <div className="self-start">Character - {chara}</div>
              <div className="self-start">Rank - {replay?.rank}</div>
              <div className="self-start">Slow rate - {replay?.slowRate}</div>
              <div className="self-start">
                Achievement - {getCCstring(replay?.achievement!)}
              </div>
              <div className="self-start">
                Stage - {replay.stage || "Not supported"}
              </div>
              <div className="self-start">
                Added - {getDateFromReplay(replay.uploadedDate!)}
              </div>
              <div className="self-start">
                Replay Date - {getDateFromReplay(replay.fileDate!)}
              </div>
              <div className="self-start">Points - {replay?.points}</div>
              <div className="self-start">
                Verified - {replay?.status === true ? "True" : "False"}
              </div>
            </div>
            <div className="flex flex-col gap-y-2 self-start p-2 bg-secondary/60 rounded-md">
              <div>
                Score - {Number(replay.score).toLocaleString()}{" "}
                {replay?.stage_score?.includes("+") ? ":" : null}
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
            {replay.comment == null || replay?.comment!.length > 3 ? (
              <div>Comment - {replay?.comment}</div>
            ) : null}
            {replay?.videoLink ? (
              <div>
                Video -{" "}
                <Link
                  className=" text-gray-400 underline"
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
      </div>
    </Card>
  );
}
