"use client";
import { achievementList, touhouDifficulty } from "@/app/constants/games";
import { scoreWR } from "@/app/constants/wrScores";
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
import { CCValueRecord, rankValueRecord } from "@/lib/calculatePoints";
import { useState } from "react";

export default function PointsTesting() {
  const [selectedGame, setSelectedGame] = useState(6);
  const [selectedScore, setSelectedScore] = useState(0);
  const [selectedRank, setSelectedRank] = useState("Normal");
  const [selectedAchiv, setSelectedAchiv] = useState("CC");
  const calculatePoints = () => {
    try {
      const CCValue = CCValueRecord[selectedAchiv!];
      const rankValue = rankValueRecord[selectedRank!];
      const scoreValue = (
        (selectedScore / scoreWR[selectedGame][selectedRank]) *
        100
      ).toFixed(2);
      const totalScore = Number(scoreValue) * rankValue * CCValue;

      return totalScore.toFixed();
    } catch (error) {
      console.log(error);
      return "0";
    }
  };
  return (
    <div className="flex gap-x-2">
      <div className="flex flex-col gap-y-1 items-center w-20">
        <Label>Game</Label>
        <Select
          name="game"
          onValueChange={(e) => {
            setSelectedGame(Number(e));
          }}
          value={selectedGame.toString()}
          defaultValue="6"
        >
          <SelectTrigger>
            <SelectValue placeholder="Game" />
          </SelectTrigger>
          <SelectContent className="h-[350px]">
            <SelectGroup>
              {[6, 7, 8, 9, 10, 11, 12, 12.8, 13, 14, 15, 16, 17, 18].map(
                (game) => (
                  <SelectItem
                    className="cursor-pointer"
                    key={game}
                    value={game.toString()}
                  >
                    {game}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-y-1 items-center">
        <Label>Score</Label>
        <Input
          type="number"
          onChange={(e) => setSelectedScore(Number(e.target.value))}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="flex flex-col gap-y-1 items-center w-28">
        <Label>Rank</Label>
        <Select
          name="rank"
          value={selectedRank}
          onValueChange={setSelectedRank}
        >
          <SelectTrigger>
            <SelectValue placeholder="Rank" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {touhouDifficulty.map((diff) => (
                <SelectItem className="cursor-pointer" key={diff} value={diff}>
                  {diff}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-y-1 items-center w-24">
        <Label>Achievement</Label>
        <Select
          name="achievement"
          value={selectedAchiv}
          onValueChange={setSelectedAchiv}
        >
          <SelectTrigger>
            <SelectValue placeholder="Rank" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {achievementList.map((achiv) => (
                <SelectItem
                  className="cursor-pointer"
                  key={achiv}
                  value={achiv}
                >
                  {achiv}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-end pb-2 font-semibold gap-x-2">
        <p>=</p>
        <p>{calculatePoints() || 0} pkt.</p>
      </div>
    </div>
  );
}
