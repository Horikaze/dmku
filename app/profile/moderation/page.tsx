import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/app/lib/prismadb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ModReplay from "../components/ModReplay";
import ChangeWeekly from "../components/ChangeWeekly";
import ChangeSiteBg from "../components/ChangeSiteBg";

export default async function Moderation() {
  const replays = await prisma.replay.findMany({
    where: {
      status: false,
    },
  });

  const session = await getServerSession(authOptions);
  if (session?.user.info.admin !== true) {
    redirect("/profile");
  }
  return (
    <div className="w-full flex flex-col gap-y-2">
      <Card>
        <CardHeader>
          <CardTitle>Moderate replays</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-2 max-h-[350px] overflow-y-scroll">
            {replays.map((r) => (
              <ModReplay replay={r} key={r.replayId} />
            ))}
          </div>
        </CardContent>
      </Card>
      <ChangeWeekly />
      <ChangeSiteBg />
    </div>
  );
}
