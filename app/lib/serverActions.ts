"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/app/lib/prismadb";
import {
  ScoreObject,
  getCharacterFromData,
  getCharacterFromDataWithoutType,
  getGameString,
  parseRankingString,
  stringifyRanking,
} from "@/lib/getRankingData";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";

type deleteReplayActionReturns = {
  status:
    | "Success"
    | "Replay dosent exists"
    | "Unauthorized"
    | "Internal error"
    | "No data provided"
    | "Replay is not yours";
};

export const deleteYourReplayAction = async (
  formData: FormData
): Promise<deleteReplayActionReturns> => {
  const session = await getServerSession(authOptions);
  if (!session) return { status: "Unauthorized" };
  const replayId = formData.get("replayID") as string;
  if (!replayId || replayId === "") return { status: "No data provided" };
  const isReplayYours = await prisma.replay.findFirst({
    where: {
      replayId,
      userId: session?.user.info.id,
    },
  });
  if (!isReplayYours) {
    return { status: "Replay dosent exists" };
  }
  if (isReplayYours?.userId !== session.user.info.id) {
    return { status: "Replay is not yours" };
  }
  await deleteReplayFunction(replayId);
  revalidatePath("/profile/replays");
  return { status: "Success" };
};

export const changeReplayStatus = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (session?.user.info.admin !== true) {
    redirect("/profile");
  }
  const status = formData.get("status") as string;
  const replayId = formData.get("replayId") as string;
  console.log(status);
  if (status !== "on") {
    return;
  }
  const updatedReplay = await prisma.replay.update({
    where: {
      replayId: replayId,
    },
    data: {
      status: true,
    },
  });

  revalidatePath("/profile/moderation");
};

const deleteReplayFunction = async (
  replayId: string
): Promise<deleteReplayActionReturns> => {
  try {
    const utapi = new UTApi();
    if (!replayId || replayId === "") return { status: "No data provided" };

    const deletedReplay = await prisma.replay.delete({
      where: {
        replayId,
      },
    });

    // calc points
    const sameReplay = await prisma.replay.findFirst({
      where: {
        game: deletedReplay.game,
        rank: deletedReplay.rank,
      },
      orderBy: {
        points: "desc",
      },
    });
    if (sameReplay) {
      const updatedPoints = -deletedReplay.points! + sameReplay.points!;
      await prisma.profile.update({
        where: {
          id: deletedReplay.userId!,
        },
        data: {
          points: {
            increment: updatedPoints,
          },
        },
      });
    } else {
      await prisma.profile.update({
        where: {
          id: deletedReplay.userId!,
        },
        data: {
          points: {
            decrement: deletedReplay.points!,
          },
        },
      });
    }
    //end of calc points

    const gameString = getGameString(deletedReplay.game!).toUpperCase();
    if (deletedReplay) {
      const parts = deletedReplay.filePath!.split("/");
      const fileName = parts[parts.length - 1];
      try {
        await utapi.deleteFiles(fileName);
      } catch (error) {
        console.log(error);
      }
      const CCreplacement = await prisma.replay.findFirst({
        where: {
          game: deletedReplay.game,
          rank: deletedReplay.rank,
        },
        orderBy: {
          achievement: "desc",
        },
      });
      if (CCreplacement) {
        const currenntRanking = await prisma.ranking.findFirst({
          where: {
            userIdRankingPoints: deletedReplay.userId!,
          },
          select: {
            [gameString]: true,
          },
        });
        const rankingObject = parseRankingString(currenntRanking![gameString]);
        const newScoreObj: ScoreObject = {
          ...rankingObject,
          [CCreplacement.rank!.toUpperCase() as keyof ScoreObject]: {
            score: CCreplacement.score!,
            id: CCreplacement.replayId!,
            CC: CCreplacement.achievement!,
            char:
              CCreplacement.game === 9
                ? getCharacterFromDataWithoutType(CCreplacement.character!)
                : getCharacterFromData(
                    CCreplacement.character!,
                    CCreplacement.shottype!
                  ),
          },
        };
        const newScoreObjString = stringifyRanking(newScoreObj);
        await prisma.ranking.update({
          where: {
            userIdRankingPoints: deletedReplay.userId!,
          },
          data: {
            [gameString]: newScoreObjString,
          },
        });
      } else {
        const currenntRanking = await prisma.ranking.findFirst({
          where: {
            userIdRankingPoints: deletedReplay.userId!,
          },
          select: {
            [gameString]: true,
          },
        });
        const rankingObject = parseRankingString(currenntRanking![gameString]);
        const newScoreObj: ScoreObject = {
          ...rankingObject,
          [deletedReplay.rank!.toUpperCase() as keyof ScoreObject]: {
            score: 0,
            id: "0",
            CC: 0,
            char: "char",
          },
        };
        const newScoreObjString = stringifyRanking(newScoreObj);
        await prisma.ranking.update({
          where: {
            userIdRankingPoints: deletedReplay.userId!,
          },
          data: {
            [gameString]: newScoreObjString,
          },
        });

        await prisma.profile.update({
          where: {
            id: deletedReplay.userId!,
          },
          data: {
            CCCount: {
              decrement: 1,
            },
          },
        });
      }
    }
    return { status: "Success" };
  } catch (e) {
    console.log(e);
    return { status: "Internal error" };
  }
};
