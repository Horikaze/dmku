import bcrypt from "bcrypt";
import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
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
        DDC: "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        EOSD: "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        GFW: "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        HSIFS:
          "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        IN: "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        LOLK: "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        MOF: "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        PCB: "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        POFV: "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        SA: "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        TD: "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        UM: "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        UFO: "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        WBAWC:
          "EASY/0/0/0/char+NORMAL/0/0/0/char+HARD/0/0/0/char+LUNATIC/0/0/0/char+EXTRA/0/0/0/char+PHANTASM/0/0/0/char+OVERDRIVE/0/0/0/char",
        userIdRankingPoints: user.id,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTERATION ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
};
