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
        DDC: "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        EOSD: "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        GFW: "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        HSIFS:
          "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        IN: "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        LOLK: "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        MOF: "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        PCB: "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        POFV: "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        SA: "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        TD: "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        UDOALG:
          "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        UM: "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        UFO: "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
        WBAWC:
          "EASY/0/0/null+NORMAL/0/0/null+HARD/0/0/null+LUNATIC/0/0/null+EXTRA/0/0/null+PHANTASM/0/0/null+OVERDRIVE/0/0/null",
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
