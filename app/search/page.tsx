"use client";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { useState } from "react";
import ButtonLoader from "../components/ButtonLoader";
import { columns } from "../components/replayTable/columns";
import { DataTable } from "../components/replayTable/data-table";
import {
  achievementList,
  games,
  shotTypeList,
  touhouDifficulty,
} from "../constants/games";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [selectedGame, setSelectedGame] = useState("All");
  const [selectedRank, setSelectedRank] = useState("All");
  const [selectedAchiv, setSelectedAchiv] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const res = await axios.post("/api/search", formData);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col gap-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Search for replays</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            id="search"
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
              <div className="flex gap-3 w-full">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Player</Label>
                  <Input
                    type="text"
                    id="player"
                    name="player"
                    placeholder="Player"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Game</Label>
                  <Select
                    name="game"
                    value={selectedGame}
                    onValueChange={setSelectedGame}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Game" />
                    </SelectTrigger>
                    <SelectContent className="h-[350px]">
                      <SelectGroup>
                        <SelectItem className="cursor-pointer" value={"All"}>
                          All
                        </SelectItem>
                        {games.map((game) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={game}
                            value={game}
                          >
                            {game}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3 w-full">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Score</Label>
                  <div className="gap-x-1 flex">
                    <Input
                      name="scoreFrom"
                      type="number"
                      id="scoreFrom"
                      placeholder="From"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <p className="flex items-center">-</p>
                    <Input
                      type="number"
                      id="scoreTo"
                      name="scoreTo"
                      placeholder="To"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <div className="flex justify-between">
                    <Label>Rank</Label>
                    <Label>Achievement</Label>
                  </div>
                  <div className="gap-x-1 flex">
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
                          <SelectItem className="cursor-pointer" value={"All"}>
                            All
                          </SelectItem>
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
                          <SelectItem className="cursor-pointer" value={"All"}>
                            All
                          </SelectItem>
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
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
              <div className="flex gap-3 w-full">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Points</Label>
                  <div className="gap-x-1 flex">
                    <Input
                      name="pointsFrom"
                      type="number"
                      id="pointsFrom"
                      placeholder="From"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <p className="flex items-center">-</p>
                    <Input
                      type="number"
                      id="pointsTo"
                      name="pointsTo"
                      placeholder="To"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Shot-type</Label>
                  <Select
                    name="shottype"
                    value={selectedType}
                    onValueChange={setSelectedType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Rank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem className="cursor-pointer" value={"All"}>
                          All
                        </SelectItem>
                        {shotTypeList.map((type) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={type}
                            value={type}
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3 w-full">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Character</Label>
                  <Input
                    type="text"
                    id="character"
                    name="character"
                    placeholder="ex. Reimu, Rm & Yk "
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>User ID</Label>
                  <Input
                    type="text"
                    id="userId"
                    name="userId"
                    placeholder="ex. e2449575-2089-4882-b4e3-700a173b2c89"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="flex row-auto justify-end gap-x-3 mr-6 mt-6">
            <Button
              form="search"
              type="reset"
              variant={"ghost"}
              onClick={() => {
                setSelectedGame("All");
                setSelectedRank("All");
                setSelectedAchiv("All");
                setSelectedType("All");
              }}
            >
              Reset
            </Button>
            <Button form="search" type="submit">
              <ButtonLoader loading={loading} />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
      <div>
        <div className="w-full">
          {data ? <DataTable columns={columns} data={data!} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
