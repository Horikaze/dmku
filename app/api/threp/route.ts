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
    const res = await axios.post(process.env.THREP as string, body);
    return NextResponse.json(res.data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
