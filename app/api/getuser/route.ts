import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;
  try {
    if (!email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const currentUser = await prisma.profile.findUnique({
      where: {
        email: email,
      },
    });
    if (!currentUser) return null;
    return NextResponse.json(currentUser);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Internal error", { status: 500 });
  }
}
