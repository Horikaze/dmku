import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { bgImages } from "@/app/constants/bg-images";
import { getCurrentWeekly, resultsElement } from "@/app/lib/weeklyChallActions";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export const blankChall = {
  challengeID: "",
  challengeName: "",
  game: 6,
  rank: "",
  desc: "",
  dateStart: "",
  dateEnd: "",
  results: "",
  ended: false,
};

export default async function WeeklyChallenge() {
  const session = await getServerSession(authOptions);
  const getYourReplay = (results: string) => {
    if (!results) return null;
    const data: resultsElement[] = JSON.parse(results);
    const userParticipation = data.find(
      (ele) => ele.userID === session?.user.info.id
    );
    if (!userParticipation) return null;
    const userPlace = data
      .sort((a, b) => b.replayPoints! - a.replayPoints!)
      .indexOf(userParticipation);
    return { userParticipation: userParticipation, place: userPlace + 1 };
  };
  const weeklyChallenge = await getCurrentWeekly();
  const yourReplay = weeklyChallenge
    ? getYourReplay(weeklyChallenge!.results!)
    : null;
  return (
    <>
      {weeklyChallenge ? (
        <Link
          className="w-full md:w-96 h-48 relative font-semibold cursor-pointer group"
          href={`/weekly/${weeklyChallenge?.challengeID}`}
          prefetch={false}
        >
          <Image
            src={bgImages[weeklyChallenge?.game!] || bgImages[6]}
            fill
            alt="game bg"
            className="absolute z-0 object-cover object-center h-full opacity-40 group-hover:opacity-30 transition-all rounded-xl"
          />
          <div className="relative h-full flex flex-col">
            <CardHeader>
              <CardTitle>Weekly Challenge</CardTitle>
              {weeklyChallenge?.desc ? (
                <CardDescription>
                  {weeklyChallenge?.desc?.slice(0, 15) + "..."}
                </CardDescription>
              ) : null}
            </CardHeader>
            <CardContent>
              {weeklyChallenge.challengeName ? (
                <p>Name: {weeklyChallenge.challengeName}</p>
              ) : null}
              <p>Game: {weeklyChallenge.game}</p>
              <p>Rank: {weeklyChallenge.rank}</p>
            </CardContent>
            {yourReplay ? (
              <div className="flex h-full items-end">
                <div className="opacity-60 w-full text-sm flex justify-end">
                  <p>This weekly rank:&nbsp; </p> <p>{yourReplay.place}</p>
                </div>
              </div>
            ) : null}
          </div>
        </Link>
      ) : (
        <div className="w-full md:w-96 h-48 font-semibold bg-secondary/60 items-center justify-center flex">
          <p className="text-2xl">No weekly challenge set :&lt;</p>
        </div>
      )}
    </>
  );
}
