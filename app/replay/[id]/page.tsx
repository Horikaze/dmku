import prisma from "@/app/lib/prismadb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

export default async function page({ params }: { params: { id: string } }) {
  const replay = await prisma.replay.findFirst({
    where: {
      replayId: params.id,
    },
  });
  if (!replay) {
    return "XD";
  }
  const replayDateString = replay?.uploadedDate?.toString();
  const dateObject = new Date(replayDateString!);

  const scoreParse = () => {
    if (replay?.stage_score?.includes("+")) {
      const scoreParts = replay.stage_score.split("+");
      return scoreParts;
    }
  };
  const score = scoreParse();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{replay?.rpy_name}</CardTitle>
        <CardDescription>{`Added ${format(
          dateObject,
          "dd-MM-yyyy"
        )}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-col gap-y-2">
          <div>
            <Label className="font-semibold text-lg">Player</Label>
            <p className="text-sm">{replay?.player}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Score</Label>
            <div className="flex flex-wrap">
              {replay?.stage_score?.includes("+")
                ? score?.map((score, index) => (
                    <div key={score}>
                      <div className="p-2 items-center text-sm flex flex-col gap-y-1">
                        <p>{`Stage ${index + 1}`}</p>
                        <p>{Number(score).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                : replay?.score}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
