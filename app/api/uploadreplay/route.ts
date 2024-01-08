import { getLastScore } from "@/app/components/replayTable/forrmatScore";
import prisma from "@/app/lib/prismadb";
import { ReplayFormData } from "@/app/types/Replay";
import {
  AchievementRank,
  ScoreObject,
  getCharacterFromData,
  getCharacterFromDataWithoutType,
  getGameNumber,
  getGameString,
  parseRankingString,
  stringifyRanking,
} from "@/lib/getRankingData";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { authOptions } from "../auth/[...nextauth]/auth";
import { revalidatePath } from "next/cache";
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    const utapi = new UTApi();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const formData = await request.formData();
    const values = Object.fromEntries(formData.entries()) as ReplayFormData;
    if (!values) {
      return new NextResponse("Problem with data", { status: 500 });
    }
    const totalScore = getLastScore(values.score!);
    const replayFile = formData.get("selectReplay") as File;
    const gameNumber = getGameNumber(replayFile.name);
    const gameString = getGameString(gameNumber).toUpperCase();
    const fileDate = new Date(Number(values.fileDate));
    const newCC = AchievementRank[values.CC as string];
    const fileExist = await prisma.replay.findFirst({
      where: {
        stage_score: values.score,
      },
    });

    if (fileExist) {
      return new NextResponse("Replay already exists", { status: 500 });
    }

    const res = await utapi.uploadFiles(replayFile);
    if (res.error) {
      return new NextResponse("Problem with file upload", { status: 500 });
    }

    const sameReplay = await prisma.replay.findFirst({
      where: {
        game: gameNumber,
        rank: values.rank,
        userId: session.user.info.id,
      },
      orderBy: {
        points: "desc",
      },
    });
    const newReplay = await prisma.replay.create({
      data: {
        achievement: newCC,
        character: values.character,
        comment: values.comment || "",
        date: values.date,
        filePath: res.data?.url,
        game: gameNumber,
        player: values.player,
        userId: session.user.info.id,
        rank: values.rank,
        slowRate: values.slowRate === "" ? "0" : values.slowRate,
        rpy_name: replayFile.name,
        stage: values.stage,
        shottype: values.type,
        points: Number(values.points),
        videoLink: values.videoLink || "",
        status: false,
        stage_score: values.score,
        score: totalScore,
        fileDate: fileDate,
      },
    });
    const currenntRanking = await prisma.ranking.findFirst({
      where: {
        userIdRankingPoints: session.user.info.id,
      },
      select: {
        [gameString]: true,
      },
    });
    const rankingObject = parseRankingString(currenntRanking![gameString]);
    const valueToUpdate =
      rankingObject[values.rank!.toUpperCase() as keyof ScoreObject];

    // calc points
    if (sameReplay) {
      if (sameReplay.points! <= newReplay.points!) {
        const updatedPoints = newReplay.points! - sameReplay.points!;
        await prisma.profile.update({
          where: {
            id: session.user.info.id,
          },
          data: {
            points: {
              increment: updatedPoints,
            },
          },
        });
        const newScoreObj: ScoreObject = {
          ...rankingObject,
          [values.rank!.toUpperCase() as keyof ScoreObject]: {
            score: totalScore,
            id: newReplay.replayId,
            CC: newCC,
            char:
              gameNumber === 9
                ? getCharacterFromDataWithoutType(values.character!)
                : getCharacterFromData(values.character!, values.type!),
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
      }
    } else {
      await prisma.profile.update({
        where: {
          id: session.user.info.id,
        },
        data: {
          points: {
            increment: Number(values.points),
          },
        },
      });
      if (valueToUpdate?.CC === 0) {
        await prisma.profile.update({
          where: {
            id: session.user.info.id,
          },
          data: {
            CCCount: {
              increment: 1,
            },
          },
        });
      }
      const newScoreObj: ScoreObject = {
        ...rankingObject,
        [values.rank!.toUpperCase() as keyof ScoreObject]: {
          score: totalScore,
          id: newReplay.replayId,
          CC: newCC,
          char:
            gameNumber === 9
              ? getCharacterFromDataWithoutType(values.character!)
              : getCharacterFromData(values.character!, values.type!),
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
    }
    //end of calc points
    revalidatePath("/profile");
    return NextResponse.json(newReplay);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
