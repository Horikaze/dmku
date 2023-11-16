import prisma from "@/app/lib/prismadb";
import { ReplayFormData } from "@/app/types/Replay";
import { getGameNumber } from "@/lib/getRankingData";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    const utapi = new UTApi();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const formData = await request.formData();
    const values = Object.fromEntries(formData.entries()) as ReplayFormData;
    const replayFile = formData.get("selectReplay") as File;
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
        game: getGameNumber(replayFile.name),
        player: values.player,
        userId: session.user.info.id,
        rank: values.rank,
        rpy_name: replayFile.name,
        stage: values.stage,
        shottype: values.type,
        status: "NEW",
        stage_score: values.score,
        hash: values.hash,
      },
    });
    if (!newReplay) {
      return new NextResponse("Problem with database", { status: 500 });
    }

    return NextResponse.json(newReplay);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
