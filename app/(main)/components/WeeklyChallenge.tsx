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

export default async function WeeklyChallenge() {
  const mainPageData = await prisma.mainPage.findFirst({
    select: {
      WeeklyChallenge: true,
    },
  });
  return (
    <Card className="w-96 h-48 relative font-semibold hover:scale-105 transition-all cursor-pointer">
      <Image
        src={bgImages[Number(mainPageData?.WeeklyChallenge?.game!)]}
        fill
        alt="game bg"
        className="absolute z-0 object-cover object-center h-full opacity-20 rounded-xl"
      />
      <div className="relative">
        <CardHeader>
          <CardTitle>Weekly Challenge</CardTitle>
          <CardDescription>
            {mainPageData?.WeeklyChallenge?.desc?.slice(0, 15) + "..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Name: {mainPageData?.WeeklyChallenge?.challengeName}</p>
          <p>Game: {mainPageData?.WeeklyChallenge?.game}</p>
          <p>Rank: {mainPageData?.WeeklyChallenge?.rank}</p>
        </CardContent>
      </div>
    </Card>
  );
}
