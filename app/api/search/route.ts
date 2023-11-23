import prisma from "@/app/lib/prismadb";
import { getGameInt } from "@/lib/getRankingData";
import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const player = formData.get("player") as string;
    const game = formData.get("game") as string;
    const scoreFrom = formData.get("scoreFrom") as string;
    const scoreTo = formData.get("scoreTo") as string;
    const rank = formData.get("rank") as string;
    const achievement = formData.get("achievement") as string;
    const shottype = formData.get("shottype") as string;
    const character = formData.get("character") as string;
    const userId = formData.get("userId") as string;

    let whereClause: Record<string, any> = {};

    if (player !== "") {
      whereClause.player = {
        contains: player,
      };
    }

    if (game !== "" && game !== "All") {
      whereClause.game = getGameInt(game);
    }

    if (scoreFrom !== "") {
      whereClause.score = {
        ...whereClause.score,
        gte: Number(scoreFrom),
      };
    }

    if (scoreTo !== "") {
      whereClause.score = {
        ...whereClause.score,
        lte: Number(scoreTo),
      };
    }

    if (rank !== "" && rank !== "All") {
      whereClause.rank = rank;
    }

    if (achievement !== "" && achievement !== "All") {
      whereClause.achievement = achievement;
    }

    if (shottype !== "" && shottype !== "All") {
      whereClause.shottype = shottype;
    }
    if (character !== "") {
      whereClause.character = {
        contains: character,
      };
    }

    if (userId !== "") {
      whereClause.userId = userId;
    }

    console.log(whereClause);
    const replays = await prisma.replay.findMany({
      where: whereClause,
    });

    // console.log(replays);
    if (!replays) {
      return new NextResponse("Replays doesn't exists");
    }

    return NextResponse.json(replays);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
