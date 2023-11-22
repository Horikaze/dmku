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
import { FormEventHandler } from "react";

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};

const Search = () => {
  return (
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
            <Input type="text" id="player" name="player" placeholder="Player" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Game</Label>
            <Select name="game">
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
            <Select name="rank">
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
          <Button form="search" type="reset" variant={"ghost"}>
            Reset
          </Button>
          <Button form="search" type="submit">
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Search;
