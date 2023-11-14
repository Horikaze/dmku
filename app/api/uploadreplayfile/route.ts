import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    const utapi = new UTApi();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const req = await request.formData();
    const replayFile = req.get("selectReplay") as File;
    const res = await utapi.uploadFiles(replayFile);
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
