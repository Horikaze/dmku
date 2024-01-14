import { getCurrentWeekly, resultsElement } from "@/app/lib/weeklyChallActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertUnixDate } from "@/lib/getRankingData";
import WeeklyForm from "./WeeklyForm";
export default async function ChangeWeekly() {
  const weeklyChallenge = await getCurrentWeekly();
  const playersLenght: resultsElement[] = weeklyChallenge
    ? JSON.parse(weeklyChallenge?.results!)
    : "";
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Challenge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-center text-xl font-semibold">Current</h2>
          {weeklyChallenge ? (
            <div className="bg-secondary p-2 rounded-md flex justify-between ">
              <div className="flex-grow">
                <p>Name: {weeklyChallenge.challengeName}</p>
                <p>
                  Start date:{" "}
                  {convertUnixDate(weeklyChallenge.dateStart as any)}
                </p>
                <p>
                  End date: {convertUnixDate(weeklyChallenge.dateEnd as any)}
                </p>
                <p>Description: {weeklyChallenge.desc}</p>
              </div>
              <div className="flex-grow">
                <p>Game: {weeklyChallenge.game}</p>
                <p>Rank: {weeklyChallenge.rank}</p>
                <p>Players: {playersLenght.length}</p>
              </div>
            </div>
          ) : null}
          <WeeklyForm />
        </div>
      </CardContent>
    </Card>
  );
}
