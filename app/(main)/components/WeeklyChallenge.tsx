import prisma from "@/app/lib/prismadb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function WeeklyChallenge() {
  const mainPageData = await prisma.mainPage.findFirst({
    select: {
      WeeklyChallenge: true,
    },
  });
  return (
    <Card className="w-80 h-48">
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
    </Card>
  );
}
