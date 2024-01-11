import { bgImages } from "@/app/constants/bg-images";
import prisma from "@/app/lib/prismadb";
import { getCurrentWeekly } from "@/app/lib/weeklyChallActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export const blankChall = {
  challengeID: "",
  challengeName: "",
  game: "",
  rank: "",
  desc: "",
  mainPageId: "",
};

export default async function WeeklyChallenge() {
  const weeklyChallenge = await getCurrentWeekly();
  const chall = weeklyChallenge || blankChall;
  return (
    <>
      {weeklyChallenge ? (
        <Link
          className="w-full md:w-96 h-48 relative font-semibold cursor-pointer group"
          href={`/weekly/${chall?.challengeID}`}
          prefetch={false}
        >
          <Image
            src={bgImages[weeklyChallenge?.game!] || bgImages[6]}
            fill
            alt="game bg"
            className="absolute z-0 object-cover object-center h-full opacity-40 group-hover:opacity-30 transition-all rounded-xl"
          />
          <div className="relative">
            <CardHeader>
              <CardTitle>Weekly Challenge</CardTitle>
              <CardDescription>
                {weeklyChallenge?.desc?.slice(0, 15) + "..."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Name: {chall.challengeName}</p>
              <p>Game: {chall.game}</p>
              <p>Rank: {chall.rank}</p>
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
