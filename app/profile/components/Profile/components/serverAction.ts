"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prismadb";

export const deleteReplayAction = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { status: "ERROR" };
    const replayId = formData.get("replayID") as string;
    if (!replayId || replayId === "") return { status: "ERROR" };

    const deletedReplay = await prisma.replay.delete({
      where: {
        replayId,
        userId: session?.user.info.id,
      },
    });
    return { status: deletedReplay ? "OK" : "ERROR" };
  } catch (error) {
    console.log(error);
    return { status: "ERROR" };
  }
};
