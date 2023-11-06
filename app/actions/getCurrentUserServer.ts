import prisma from "@/app/lib/prismadb";
export const getCurrentUserServer = async (email: string) => {
  try {
    const currentUser = await prisma.profile.findUnique({
      where: {
        email: email,
      },
    });
    return currentUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};
