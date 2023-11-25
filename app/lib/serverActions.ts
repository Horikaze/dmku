"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prismadb";

type deleteReplayActionReturns = {
  status:
    | "Deleted"
    | "Replay dosent exists"
    | "Unauthorized"
    | "Internal error"
    | "No data provided";
};

export const deleteReplayAction = async (
  formData: FormData
): Promise<deleteReplayActionReturns> => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { status: "Unauthorized" };
    const replayId = formData.get("replayID") as string;
    if (!replayId || replayId === "") return { status: "No data provided" };

    const deletedReplay = await prisma.replay.delete({
      where: {
        replayId,
        userId: session?.user.info.id,
      },
    });
    return { status: deletedReplay ? "Deleted" : "Replay dosent exists" };
  } catch (error) {
    console.log(error);
    return { status: "Replay dosent exists" };
  }
};
