import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
export const getCurrentUserServer = async () => {
  const session = await getServerSession(authOptions);
  try {
    const currentUser = await prisma.profile.findFirst({
      where: {
        email: session?.user?.email!,
      },
    });
    return currentUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};
