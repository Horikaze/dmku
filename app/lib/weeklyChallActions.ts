"use server";
import prisma from "@/app/lib/prismadb";

function getNextSunday(): Date {
  const now: Date = new Date();
  now.setHours(now.getHours() + 2);
  let dayOfWeek: number = now.getDay();
  if (dayOfWeek === 0 && now.getHours() >= 20) {
    dayOfWeek = 7;
  }
  const daysUntilSunday: number = 7 - dayOfWeek;
  const nextSunday: Date = new Date(
    now.getTime() + daysUntilSunday * 24 * 60 * 60 * 1000
  );
  nextSunday.setHours(20, 0, 0, 0);
  return nextSunday;
}

export const createNewWeekly = async (formData: FormData) => {
  const rank = formData.get("rank") as string;
  const challengeName = formData.get("challengeName") as string;
  const game = Number(formData.get("game") as string);
  const desc = formData.get("desc") as string;

  const newWeekly = await prisma.weeklyChallenge.create({
    data: {
      rank,
      challengeName,
      game,
      desc,
      dateEnd: getNextSunday(),
      mainPageId: "0",
    },
  });
  await prisma.mainPage.update({
    where: {
      id: "0",
    },
    data: {
      // @ts-ignore
      //bug?
      WeeklyChallenge: newWeekly,
    },
  });
};
const weeklyResults: Record<number, number> = {
  1: 360,
  2: 180,
  3: 120,
  4: 90,
  5: 72,
  6: 60,
  7: 52,
  8: 45,
  9: 40,
  10: 36,
};
export const endWeekly = async (formData: FormData) => {
  const weeklyId = formData.get("weeklyId") as string;
  const weeklyChallenge = await prisma.weeklyChallenge.findFirst({
    where: {
      challengeID: weeklyId,
    },
  });
  type resultsElement = {
    place: number;
    replay: string;
    replayPoints: number | null;
    weeklyPoints: number;
    userImg: string | null | undefined;
    userID: string | undefined;
    userNickname: string | null | undefined;
  };
  const weeklyReplays = await prisma.replay.findMany({
    where: {
      uploadedDate: {
        gte: weeklyChallenge?.dateStart,
        lte: weeklyChallenge?.dateEnd!,
      },
    },
    include: {
      Profile: {
        select: {
          nickname: true,
          id: true,
          imageUrl: true,
        },
      },
    },
    orderBy: {
      points: "desc",
    },
  });
  let results: resultsElement[] = [];
  weeklyReplays.forEach((element, idx) => {
    const pointsToAdd = idx >= 10 ? weeklyResults[idx + 1] : 0;
    const res = {
      place: idx + 1,
      replay: element.replayId,
      replayPoints: element.points,
      weeklyPoints: pointsToAdd,
      userImg: element.Profile?.imageUrl,
      userID: element.Profile?.id,
      userNickname: element.Profile?.nickname,
    };
    results.push(res);
  });
};
