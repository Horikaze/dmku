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
    const userRanking = await prisma.ranking.create({
      data: {
        DDC: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        EOSD: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        GFW: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        HSIFS:
          "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        IN: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        LOLK: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        MOF: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        PCB: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        POFV: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        SA: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        TD: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        UM: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        UFO: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        WBAWC:
          "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
        total: 0,
        userIdRankingPoints: user.id,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTERATION ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
};
