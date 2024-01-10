import { touhouDifficulty } from "@/app/constants/games";
import { createNewWeekly, endWeekly } from "@/app/lib/weeklyChallActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { gameCodeRecord } from "@/lib/getRankingData";
export default async function ChangeWeekly() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Weekly</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-y-2"
          id="weekly"
          action={createNewWeekly}
        >
          <div className="flex justify-between">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Rank</Label>
              <Select name="rank">
                <SelectTrigger>
                  <SelectValue placeholder="Rank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem className="cursor-pointer" value={"All"}>
                      All
                    </SelectItem>
                    {touhouDifficulty.map((rank) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={rank}
                        value={rank}
                      >
                        {rank}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Challenge Name</Label>
              <Input type="text" id="challengeName" name="challengeName" />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-full place-content-start">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Game</Label>
                <Select name="game">
                  <SelectTrigger>
                    <SelectValue placeholder="Game" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(gameCodeRecord).map((game) => (
                        <SelectItem
                          className="cursor-pointer"
                          key={game}
                          value={game.toString()}
                        >
                          {game}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Description</Label>
              <Textarea id="desc" form="weekly" name="desc" />
            </div>
          </div>
        </form>
        <div className="flex items-center justify-between pt-2">
          <Button type="submit" form="end">
            End
          </Button>
          <Button type="submit" form="weekly">
            Save
          </Button>
        </div>
      </CardContent>
      <form action={endWeekly} hidden id="end" />
    </Card>
  );
}
