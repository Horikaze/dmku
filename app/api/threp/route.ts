import { ReplayInfo } from "@/app/types/Replay";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const session = getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.formData();
    const replayFile = body.get("replay") as File;
    const formData = new FormData();
    formData.append("replay", replayFile);
    const res = await axios.post(
      process.env.NEXT_PUBLIC_APITHREP as string,
      formData
    );
    const replayData = (await res.data()) as ReplayInfo;
    return NextResponse.json(replayData);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
