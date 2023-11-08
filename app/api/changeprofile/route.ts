import bcrypt from "bcrypt";
import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { nickname, password, discord, game } = body;
    // PROFESIONAL CODE XDDDDDDDDDDDDDDDD
    if (password !== "") {
      const hashedPassword = await bcrypt.hash(password, 12);
      await prisma.profile.update({
        where: {
          email: session?.user.info.email,
        },
        data: {
          hashedPassword,
        },
      });
    }
    if (nickname !== "") {
      await prisma.profile.update({
        where: {
          email: session?.user.info.email,
        },
        data: {
          nickname,
        },
      });
    }
    if (discord !== "") {
      await prisma.profile.update({
        where: {
          email: session?.user.info.email,
        },
        data: {
          discord,
        },
      });
    }
    if (game !== "") {
      await prisma.profile.update({
        where: {
          email: session?.user.info.email,
        },
        data: {
          favoriteGame: game,
        },
      });
    }

    return new NextResponse("Updated", { status: 200 });
  } catch (error) {
    console.log(error, "REGISTERATION ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
};
