"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prismadb";
import {
  ScoreObject,
  getCharacterFromData,
  getCharacterFromDataWithoutType,
  getGameString,
  parseRankingString,
  stringifyRanking,
} from "@/lib/getRankingData";

type deleteReplayActionReturns = {
  status:
    | "Deleted"
    | "Replay dosent exists"
    | "Unauthorized"
    | "Internal error"
    | "No data provided";
};

export const deleteReplayAction = async (
  formData: FormData
): Promise<deleteReplayActionReturns> => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { status: "Unauthorized" };
    const replayId = formData.get("replayID") as string;
    if (!replayId || replayId === "") return { status: "No data provided" };

    const deletedReplay = await prisma.replay.delete({
      where: {
        replayId,
        userId: session?.user.info.id,
      },
    });
    const gameString = getGameString(deletedReplay.game!).toUpperCase();
    if (deletedReplay) {
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
            userIdRankingPoints: session.user.info.id,
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
            userIdRankingPoints: session.user.info.id,
          },
          data: {
            [gameString]: newScoreObjString,
          },
        });
      } else {
        const currenntRanking = await prisma.ranking.findFirst({
          where: {
            userIdRankingPoints: session.user.info.id,
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
            userIdRankingPoints: session.user.info.id,
          },
          data: {
            [gameString]: newScoreObjString,
          },
        });

        await prisma.ranking.update({
          where: {
            userIdRankingPoints: session.user.info.id,
          },
          data: {
            total: {
              decrement: 1,
            },
          },
        });
        await prisma.profile.update({
          where: {
            id: session.user.info.id,
          },
          data: {
            CCCount: {
              decrement: 1,
            },
          },
        });
      }
    }
    return { status: "Deleted" };
  } catch (error) {
    console.log(error);
    return { status: "Replay dosent exists" };
  }
};
