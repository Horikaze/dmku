"use server";
import prisma from "@/app/lib/prismadb";
import { Profile, Replay } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
  try {
    const rank = formData.get("rank") as string;
    const challengeName = formData.get("challengeName") as string;
    const game = Number(formData.get("game") as string);
    const desc = formData.get("desc") as string;
    console.log(rank);
    console.log(challengeName);
    console.log(game);
    console.log(desc);
    const newWeekly = await prisma.weeklyChallenge.create({
      data: {
        rank,
        challengeName,
        game,
        desc,
        dateEnd: getNextSunday(),
        results: "[]",
        ended: false,
      },
    });
    await prisma.mainPage.update({
      where: {
        id: "0",
      },
      data: {
        weeklyChallenge: newWeekly.challengeID,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
const weeklyPoints: Record<number, number> = {
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
type resultsElement = {
  replay: string;
  replayPoints: number | null;
  userImg: string | null | undefined;
  userID: string | undefined;
  userNickname: string | null | undefined;
};
export const endWeekly = async (formData: FormData) => {
  try {
    const weeklyId = formData.get("weeklyId") as string;
    const weeklyChallenge = await prisma.weeklyChallenge.findFirst({
      where: {
        challengeID: weeklyId,
      },
    });
    if (!weeklyChallenge) return;
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
      const res: resultsElement = {
        replay: element.replayId,
        replayPoints: element.points,
        userImg: element.Profile?.imageUrl,
        userID: element.Profile?.id,
        userNickname: element.Profile?.nickname,
      };
      results.push(res);
    });

    await prisma.weeklyChallenge.update({
      where: {
        challengeID: weeklyId,
      },
      data: {
        results: JSON.stringify(results),
        ended: true,
      },
    });
    const sortedReplays = [...results].sort(
      (a, b) => b.replayPoints! - a.replayPoints!
    );
    for (const replay of sortedReplays) {
      const userIndex = sortedReplays.indexOf(replay);
      const pointsToAdd = userIndex <= 11 ? weeklyPoints[userIndex + 1] : 0;
      await prisma.profile.update({
        where: {
          id: replay.replay,
        },
        data: {
          event: {
            increment: pointsToAdd,
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// for uploadreplay endpoint
export const addToWeekly = async (replay: Replay, user: Profile) => {
  try {
    const { rank, game, points, replayId, userId } = replay;
    const currentPage = await prisma.mainPage.findFirst({
      where: {
        id: "0",
      },
      select: {
        weeklyChallenge: true,
      },
    });
    if (!currentPage) return;
    const currentWeekly = await prisma.weeklyChallenge.findFirst({
      where: {
        challengeID: currentPage.weeklyChallenge!,
      },
    });
    if (rank !== currentWeekly?.rank && game !== currentWeekly?.game) {
      return;
    }
    const currentRes: resultsElement[] = JSON.parse(currentWeekly.results!);
    console.log(currentRes);
    const userParticipation = currentRes.find((ele) => ele.userID);
    if (!userParticipation) {
      const newParticipation: resultsElement = {
        replay: replayId,
        replayPoints: points,
        userID: userId!,
        userImg: user.imageUrl,
        userNickname: user.nickname,
      };

      const newRes = [...currentRes, newParticipation];
      await prisma.weeklyChallenge.update({
        where: {
          challengeID: currentWeekly.challengeID,
        },
        data: {
          results: JSON.stringify(newRes),
        },
      });
      revalidatePath(`weekly/${currentWeekly.challengeID}`);
      return;
    }
    if (userParticipation?.replayPoints! <= points!) {
      const newParticipation: resultsElement = {
        replay: replayId,
        replayPoints: points,
        userID: userId!,
        userImg: user.imageUrl,
        userNickname: user.nickname,
      };
      const newResWithoutUserParticipation = currentRes.filter(
        (ele) => ele.userID !== userParticipation.userID
      );
      const newRes = [...newResWithoutUserParticipation, newParticipation];

      await prisma.weeklyChallenge.update({
        where: {
          challengeID: currentWeekly.challengeID,
        },
        data: {
          results: JSON.stringify(newRes),
        },
      });
      revalidatePath(`weekly/${currentWeekly.challengeID}`);
    }
  } catch (error) {
    console.log(error);
  }
};
