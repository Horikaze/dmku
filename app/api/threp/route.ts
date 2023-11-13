import { ScoreObject } from "@/lib/getRankingData";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.formData();
  const replayFile = body.get("replay") as File;
  const formData = new FormData();
  formData.append("replay", replayFile);
  const res = await axios.post(
    process.env.NEXT_PUBLIC_APITHREP as string,
    formData
  );
  const replayData = (await res.data()) as ScoreObject;
  return NextResponse.json(replayData);
}
