"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { games } from "@/lib/getRankingData";
import { useEffect, useState } from "react";
import { achievementList, touhouDifficulty } from "../constants/games";
import { scoreWR } from "../constants/wrScores";

interface RankValueRecord {
  [key: string]: number;
}

interface CCValueRecord {
  [key: string]: number;
}

export default function Search() {
  const [selectedGame, setSelectedGame] = useState(6);
  const [selectedScore, setSelectedScore] = useState(0);
  const [selectedRank, setSelectedRank] = useState("All");
  const [selectedAchiv, setSelectedAchiv] = useState("All");
  const [points, setPoints] = useState(0);

  const [rankValueRecord, setRankValueRecord] = useState<RankValueRecord>({
    Easy: 1,
    Normal: 4,
    Hard: 4,
    Extra: 4,
    Lunatic: 7,
    Phantasm: 4,
    overdrive: 3,
  });

  const [CCValueRecord, setCCValueRecord] = useState<CCValueRecord>({
    CC: 1,
    NM: 3,
    NB: 3,
    NMNB: 6,
    NNN: 8,
    NNNN: 10,
  });
  const updateRankValue = (key: string, value: number) => {
    setRankValueRecord((prevRankValueRecord) => ({
      ...prevRankValueRecord,
      [key]: value,
    }));
  };

  const updateCCValue = (key: string, value: number) => {
    setCCValueRecord((prevCCValueRecord) => ({
      ...prevCCValueRecord,
      [key]: value,
    }));
  };

  const handleRankInputChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10) || 0; // Parse input value as an integer
      updateRankValue(key, value);
    };

  const handleCCInputChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10) || 0; // Parse input value as an integer
      updateCCValue(key, value);
    };

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
    <div className=" flex flex-col gap-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Game</Label>
              <Select
                name="game"
                onValueChange={(e) => {
                  setSelectedGame(Number(e));
                }}
                value={selectedGame.toString()}
                defaultValue="1"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Game" />
                </SelectTrigger>
                <SelectContent className="h-[350px]">
                  <SelectGroup>
                    {[6, 7, 8, 9, 10, 11, 12, 12.3, 13, 14, 15, 16, 17, 18].map(
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

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Score</Label>
              <div className="gap-x-1 flex">
                <Input
                  name="score"
                  type="number"
                  id="score"
                  onChange={(e) => setSelectedScore(Number(e.target.value))}
                  value={selectedScore.toString()}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
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
                      <SelectItem
                        className="cursor-pointer"
                        key={diff}
                        value={diff}
                      >
                        {diff}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="player">Achievement</Label>
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
          </div>
          <div className="w-full py-4 flex justify-between">
            <div>
              <p>Points: {calculatePoints()}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex relative text-xs">
                <p className="absolute left-0">your score</p>
                <p className="absolute left-28"> WR score</p>
                <p className="absolute right-11">rank</p>
                <p className="absolute right-0">achiv</p>-
              </div>
              <p>
                ({selectedScore} / {scoreWR[selectedGame][selectedRank]} * 100)
                * <span className="px-2">{rankValueRecord[selectedRank!]}</span>{" "}
                * <span className="px-2"> {CCValueRecord[selectedAchiv!]}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mulitiplers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-y-1.5">
            <div>
              <h2 className="text-center font-bold">Rank Value</h2>
              <ul>
                {Object.entries(rankValueRecord).map(([key, value]) => (
                  <li key={key}>
                    {key}:
                    <Input
                      type="number"
                      value={value}
                      onChange={handleRankInputChange(key)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-center font-bold">CC Value</h2>
              <ul>
                {Object.entries(CCValueRecord).map(([key, value]) => (
                  <li key={key}>
                    {key}:
                    <Input
                      type="number"
                      value={value}
                      onChange={handleCCInputChange(key)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
