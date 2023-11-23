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
import { games, touhouDifficulty } from "@/lib/getRankingData";
import axios from "axios";
import { useState } from "react";
import ButtonLoader from "../components/ButtonLoader";
import { columns } from "../components/replayTable/columns";
import { DataTable } from "../components/replayTable/data-table";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [selectedGame, setSelectedGame] = useState("All");
  const [selectedRank, setSelectedRank] = useState("All");

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
            className="flex items-center justify-center gap-3 max-w-4xl"
          >
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="player">Player</Label>
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
