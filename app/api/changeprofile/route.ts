import bcrypt from "bcrypt";
import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { nickname, password, discord, game, bio } = body;

    const fieldsToChange: Record<string, any> = {};

    if (password !== "") {
      const hashedPassword = await bcrypt.hash(password, 12);
      fieldsToChange["hashedPassword"] = hashedPassword;
    }
    if (nickname !== "") {
      fieldsToChange["nickname"] = nickname;
    }
    if (discord !== "") {
      fieldsToChange["discord"] = discord;
    }
    if (game !== "") {
      fieldsToChange["favoriteGame"] = (game as string).toUpperCase();
    }
    if (bio !== "") {
      fieldsToChange["bio"] = bio;
    }
    await prisma.profile.update({
      where: {
        email: session?.user.info.email,
      },
      data: fieldsToChange,
    });

    return new NextResponse("Updated", { status: 200 });
  } catch (error) {
    console.log(error, "CHANGE PROFILE ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
};
