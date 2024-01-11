"use client";
import { touhouDifficulty } from "@/app/constants/games";
import { createNewWeekly, endWeekly } from "@/app/lib/weeklyChallActions";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/components/ui/use-toast";
import { gameCodeRecord } from "@/lib/getRankingData";
import { useRef } from "react";
export default function WeeklyForm() {
  const { toast } = useToast();
  const ref = useRef<HTMLFormElement>(null);
  return (
    <div>
      <form
        action={async (form) => {
          const { message } = await endWeekly(form);
          toast({
            description: `${message}`,
          });
        }}
        hidden
        id="end"
      ></form>
      <Button type="submit" form="end" className="self-end">
        End
      </Button>
      <h2 className="font-semibold text-xl text-center pb-3">Change weekly</h2>
      <form
        ref={ref}
        className="flex flex-col gap-y-2"
        id="weekly"
        action={async (form) => {
          ref.current?.reset();
          const { status, message } = await createNewWeekly(form);
          toast({
            description: `${message}`,
          });
        }}
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
      <Button type="submit" form="weekly" className="self-end">
        Set
      </Button>
    </div>
  );
}
