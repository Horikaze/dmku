import { bgImages } from "@/app/constants/bg-images";
import { getCurrentWeekly } from "@/app/lib/weeklyChallActions";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertUnixDateHours } from "@/lib/getRankingData";
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
  const weeklyChallenge = await getCurrentWeekly();

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
              <p>
                End date: {convertUnixDateHours(weeklyChallenge.dateEnd as any)}
              </p>
            </CardContent>
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
