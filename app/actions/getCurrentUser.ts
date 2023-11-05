import prisma from "@/app/libs/prismadb";
import { getSession } from "next-auth/react";
export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const currentUser = await prisma.profile.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!currentUser) return null;

    return currentUser;
  } catch (error) {
    return null;
  }
};
