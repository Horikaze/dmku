"use client";

import { touhouDifficulty } from "@/app/constants/games";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  games,
  getCCstring,
  getDateFromReplay,
  getGameInt,
  getGameString,
} from "@/lib/getRankingData";
import { Replay } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
export const columns: ColumnDef<Replay>[] = [
  {
    accessorKey: "game",
    header: ({ table }) => {
      return (
        <Select
          onValueChange={(e) => {
            console.log(table.getColumn("game")?.getFilterValue() as string);
            if (e === "All") {
              table.getColumn("game")?.setFilterValue("");
              return;
            }
            table.getColumn("game")?.setFilterValue(getGameInt(e).toString());
          }}
        >
          <SelectTrigger className="border-none">
            <SelectValue placeholder="Game" />
          </SelectTrigger>
          <SelectContent className="h-[350px]">
            <SelectGroup>
              <SelectItem className="cursor-pointer" value={"All"}>
                Game
              </SelectItem>
              {games.map((game) => (
                <SelectItem className="cursor-pointer" key={game} value={game}>
                  {game}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
    cell({ row }) {
      const game = row.getValue("game");
      return <div className="font-medium">{getGameString(Number(game))}</div>;
    },
  },
  {
    accessorKey: "player",
    header: () => <div className="text-left">Player</div>,
  },
  {
    accessorKey: "char",
    header: ({ table }) => {
      return (
        <Input
          className="border-none max-w-[200px]"
          placeholder="Character"
          onChange={(e) => {
            table.getColumn("char")?.setFilterValue(e.target.value);
          }}
        />
      );
    },
  },
  {
    accessorKey: "achievement",
    header: () => <div className="text-center">Achievement</div>,
    cell({ row }) {
      const achievement = row.getValue("achievement") as number;
      return <div className="text-center">{getCCstring(achievement!)}</div>;
    },
  },
  {
    accessorKey: "rank",
    header: ({ table }) => {
      return (
        <Select
          onValueChange={(e) => {
            if (e === "All") {
              table.getColumn("rank")?.setFilterValue("");
              return;
            }
            table.getColumn("rank")?.setFilterValue(e);
          }}
        >
          <SelectTrigger className="border-none">
            <SelectValue placeholder="Rank" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="cursor-pointer" value={"All"}>
                Rank
              </SelectItem>
              {touhouDifficulty.map((diff) => (
                <SelectItem className="cursor-pointer" key={diff} value={diff}>
                  {diff}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
    cell({ row }) {
      const rank = row.getValue("rank") as string;
      return <div className="text-center">{rank}</div>;
    },
  },
  {
    accessorKey: "score",
    header: ({ column, header }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Score
          {header.column.getIsSorted() === "asc" ? (
            <FaArrowDown className="ml-2 h-3 w-3" />
          ) : (
            <FaArrowUp className="ml-2 h-3 w-3" />
          )}
        </Button>
      );
    },
    cell({ row }) {
      const score = row.getValue("score") as number;
      return <div className="font-medium">{score.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "uploadedDate",
    header: ({ column, header }) => {
      return (
        <div className="w-full flex justify-center">
          <Button
            className="place-self-center"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Added date
            {header.column.getIsSorted() === "asc" ? (
              <FaArrowDown className="ml-2 h-3 w-3" />
            ) : (
              <FaArrowUp className="ml-2 h-3 w-3" />
            )}
          </Button>
        </div>
      );
    },
    cell({ row }) {
      const uploadedDate = row.getValue("uploadedDate") as Date;
      return (
        <div className="text-center">{getDateFromReplay(uploadedDate)}</div>
      );
    },
  },
  {
    accessorKey: "points",
    header: () => <div className="text-center">Points</div>,
    cell({ row }) {
      const points = row.getValue("points") as string;
      return <div className="text-center">{points}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ table }) => {
      return (
        <Select
          onValueChange={(e) => {
            if (e === "All") {
              table.getColumn("status")?.setFilterValue("");
              return;
            }
            table.getColumn("status")?.setFilterValue(e);
          }}
        >
          <SelectTrigger className="border-none">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="cursor-pointer" value={"All"}>
                Status
              </SelectItem>
              <SelectItem className="cursor-pointer" value={"NEW"}>
                NEW
              </SelectItem>
              <SelectItem className="cursor-pointer" value={"VERIFIED"}>
                VERIFIED
              </SelectItem>
              <SelectItem className="cursor-pointer" value={"REJECTED"}>
                REJECTED
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
    cell({ row }) {
      const status = row.getValue("status") as string;
      return <div className="font-medium text-center">{status}</div>;
    },
  },
];
