import prisma from "@/app/lib/prismadb";
import { ReplayInfo } from "@/app/types/Replay";
import { getCharacterFromDataWithoutTypeshot } from "@/lib/getRankingData";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const session = getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const replayData = (await request.json()) as ReplayInfo;

    const replay = await prisma.replay.create({
      data: {
        character: getCharacterFromDataWithoutTypeshot(replayData.character),
        
      },
    });
    return NextResponse.json(replayData);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
