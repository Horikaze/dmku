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
        DDC: "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        EOSD: "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        GFW: "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        HSIFS:
          "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        IN: "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        LOLK: "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        MOF: "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        PCB: "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        POFV: "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        SA: "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        TD: "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        UDOALG:
          "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        UM: "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        UFO: "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
        WBAWC:
          "EASY/0/0/CC+NORMAL/0/0/CC+HARD/0/0/CC+LUNATIC/0/0/CC+EXTRA/0/0/CC+PHANTASM/0/0/CC+OVERDRIVE/0/0/CC",
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
