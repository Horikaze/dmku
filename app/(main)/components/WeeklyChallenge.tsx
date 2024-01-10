import { bgImages } from "@/app/constants/bg-images";
import prisma from "@/app/lib/prismadb";
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
  const mainPageData = await prisma.mainPage.findFirst({
    select: {
      weeklyChallenge: true,
    },
  });
  console.log(mainPageData);
  const weeklyChallenge = await prisma.weeklyChallenge.findFirst({
    where: {
      challengeID: mainPageData?.weeklyChallenge! || "0",
    },
  });
  console.log(weeklyChallenge);
  const chall = weeklyChallenge || blankChall;
  return (
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
  );
}
