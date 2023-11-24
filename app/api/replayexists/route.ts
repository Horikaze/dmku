import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/auth";
export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const data = await req.json();
    const { hash, score } = data;
    const replay = await prisma.replay.findFirst({
      where: {
        hash,
        stage_score: score,
      },
    });
    console.log(replay);
    if (!replay) {
      return new NextResponse("Replay doesn't exists");
    }
    if (replay) {
      return new NextResponse("Replay exists");
    }
    return NextResponse.json(replay);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
