import prisma from "@/app/lib/prismadb";
import { ReplayFormData } from "@/app/types/Replay";
import {
  ScoreObject,
  getGameCode,
  getGameNumber,
  parseRankingString,
  stringifyRanking,
} from "@/lib/getRankingData";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Ranking } from "@prisma/client";
import { getLastNumber } from "@/app/components/replayTable/forrmatScore";
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
    const totalScore = getLastNumber(values.score!);
    const replayFile = formData.get("selectReplay") as File;
    const gameNumber = getGameNumber(replayFile.name);
    const gameString = getGameCode(gameNumber).toUpperCase();
    const fileExist = await prisma.replay.findFirst({
      where: {
        hash: values.hash,
      },
    });

    if (fileExist) {
      return new NextResponse("Replay already exists", { status: 500 });
    }

    const res = await utapi.uploadFiles(replayFile);
    if (res.error) {
      return new NextResponse("Problem with file upload", { status: 500 });
    }
  
    const newReplay = await prisma.replay.create({
      data: {
        achievement: values.CC,
        character: values.character,
        comment: values.comment,
        date: values.date,
        filePath: res.data?.url,
        game: gameNumber,
        player: values.player,
        userId: session.user.info.id,
        rank: values.rank,
        rpy_name: replayFile.name,
        stage: values.stage,
        shottype: values.type,
        status: "NEW",
        stage_score: values.score,
        hash: values.hash,
        fileDate: values.fileDate,
      },
    });
    let currenntRanking;
    currenntRanking = await prisma.ranking.findFirst({
      where: {
        userIdRankingPoints: session.user.info.id,
      },
      select: {
        [gameString]: true,
      },
    });

    if (!currenntRanking) {
      currenntRanking = await prisma.ranking.create({
        data: {
          userIdRankingPoints: session.user.info.id,
        },
        select: {
          [gameString]: true,
        },
      });
    }
    const rankingObject = parseRankingString(currenntRanking![gameString]);
    const valueToUpdate =
      rankingObject[values.rank!.toUpperCase() as keyof ScoreObject];

    if (valueToUpdate!.score! <= totalScore) {
      const newScoreObj: ScoreObject = {
        ...rankingObject,
        [values.rank!.toUpperCase() as keyof ScoreObject]: {
          score: totalScore,
          id: newReplay.replayId,
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

    return NextResponse.json(newReplay);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
