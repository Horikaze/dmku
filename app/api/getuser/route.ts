import { getSession } from "next-auth/react";
import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();
    console.log(email);
    if (!email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const currentUser = await prisma.profile.findUnique({
      where: {
        email: email,
      },
    });
    if (!currentUser) return null;
    return NextResponse.json(currentUser)
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Internal error", { status: 500 });
  }
};
