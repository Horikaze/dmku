import bcrypt from "bcrypt";
import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import { emptyScoreObjectString } from "@/lib/getRankingData";
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { nickname, password } = body;

    if (!nickname || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.profile.create({
      data: {
        email: nickname.replace(/\s/g, "_") + "@dmku.pl",
        hashedPassword,
        nickname,
        name: nickname,
      },
    });
    await prisma.mainPage.update({
      where: {
        id: "0",
      },
      data: {
        profileId: user.id,
      },
    });
    const userRanking = await prisma.ranking.create({
      data: {
        DDC: emptyScoreObjectString,
        EOSD: emptyScoreObjectString,
        GFW: emptyScoreObjectString,
        HSIFS: emptyScoreObjectString,
        IN: emptyScoreObjectString,
        LOLK: emptyScoreObjectString,
        MOF: emptyScoreObjectString,
        PCB: emptyScoreObjectString,
        POFV: emptyScoreObjectString,
        SA: emptyScoreObjectString,
        TD: emptyScoreObjectString,
        UM: emptyScoreObjectString,
        UFO: emptyScoreObjectString,
        WBAWC: emptyScoreObjectString,
        userIdRankingPoints: user.id,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTERATION ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
};
