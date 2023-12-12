import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ModReplay from "../components/ModReplay";

export default async function Moderation() {
  const replays = await prisma.replay.findMany({
    where: {
      status: "UNVERIFIED",
    },
  });

  const session = await getServerSession(authOptions);
  if (session?.user.info.admin !== true) {
    redirect("/profile");
  }
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Moderate replays</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-2 max-h-[800px] overflow-y-scroll">
            {replays.map((r) => (
              <ModReplay replay={r} key={r.replayId} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
