"use server";
import prisma from "@/app/lib/prismadb";
import { Profile, Replay } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";

export type resultsElement = {
  replay: string;
  replayPoints: number | null;
  userImg: string | null | undefined;
  userID: string | undefined;
  userNickname: string | null | undefined;
};
type weeklyRes = {
  status: boolean;
  message?: string;
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

export const createNewWeekly = async (
  formData: FormData
): Promise<weeklyRes> => {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.info.admin !== true)
      return { status: false, message: "Unauthorized" };
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
    return { status: true, message: "Success" };
  } catch (error) {
    console.log(error);
    return { status: false, message: `${error}` };
  }
};
export const endWeekly = async (formData: FormData): Promise<weeklyRes> => {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.info.admin !== true)
      return { status: false, message: "Unauthorized" };
    const currentWeekly = await getCurrentWeekly();
    if (!currentWeekly)
      return { status: false, message: "No weekly is currently running" };

    const results: resultsElement[] = JSON.parse(currentWeekly.results!);

    const sortedReplays = [...results].sort(
      (a, b) => b.replayPoints! - a.replayPoints!
    );
    console.log(sortedReplays);
    for (const replay of sortedReplays) {
      const userIndex = sortedReplays.indexOf(replay);
      const pointsToAdd = userIndex <= 11 ? weeklyPoints[userIndex + 1] : 0;
      await prisma.profile.update({
        where: {
          id: replay.userID,
        },
        data: {
          event: {
            increment: pointsToAdd,
          },
        },
      });
    }
    await prisma.mainPage.update({
      where: {
        id: "0",
      },
      data: {
        weeklyChallenge: "0",
      },
    });
    revalidatePath("/");
    revalidatePath(`/profile/moderation`);
    return { status: true, message: "Success" };
  } catch (error) {
    console.log(error);
    return { status: false, message: `${error}` };
  }
};
// for uploadreplay endpoint
export const addToWeekly = async (replay: Replay, user: Profile) => {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.info.admin !== true)
      return { status: false, message: "Unauthorized" };
    const { rank, game, points, replayId, userId } = replay;
    const currentWeekly = await getCurrentWeekly();
    if (rank !== currentWeekly?.rank && game !== currentWeekly?.game) {
      return;
    }
    const currentRes: resultsElement[] = JSON.parse(currentWeekly.results!);
    console.log(currentRes);
    const userParticipation = currentRes.find((ele) => ele.userID === userId);
    const newParticipation: resultsElement = {
      replay: replayId,
      replayPoints: points,
      userID: userId!,
      userImg: user.imageUrl,
      userNickname: user.nickname,
    };
    if (!userParticipation) {
      const newRes = [...currentRes, newParticipation];
      await prisma.weeklyChallenge.update({
        where: {
          challengeID: currentWeekly.challengeID,
        },
        data: {
          results: JSON.stringify(newRes),
        },
      });
      revalidatePath(`/weekly/${currentWeekly.challengeID}`);
      revalidatePath(`/profile/moderation`);
      return;
    }
    if (userParticipation?.replayPoints! <= points!) {
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
      revalidatePath(`/weekly/${currentWeekly.challengeID}`);
      revalidatePath(`/profile/moderation`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentWeekly = async () => {
  const mainPageData = await prisma.mainPage.findFirst({
    select: {
      weeklyChallenge: true,
    },
  });
  const weeklyChallenge = await prisma.weeklyChallenge.findFirst({
    where: {
      challengeID: mainPageData?.weeklyChallenge! || "0",
    },
  });
  return weeklyChallenge;
};
