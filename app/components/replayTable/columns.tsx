"use client";

import { Button } from "@/components/ui/button";
import {
  games,
  getGameCode,
  getGameString,
  touhouDifficulty,
} from "@/lib/getRankingData";
import { Replay } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { FaArrowUp } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const columns: ColumnDef<Replay>[] = [
  {
    accessorKey: "game",
    header: ({ table }) => {
      return (
        <Select
          onValueChange={(e) => {
            if (e === "All") {
              table.getColumn("game")?.setFilterValue("");
              return;
            }
            table
              .getColumn("game")
              ?.setFilterValue(getGameString(e).toString());
          }}
        >
          <SelectTrigger className="border-none">
            <SelectValue placeholder="Game" />
          </SelectTrigger>
          <SelectContent>
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
      return <div className="font-medium">{getGameCode(Number(game))}</div>;
    },
  },
  {
    accessorKey: "player",
    header: () => <div className="text-left">Player</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
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
  },
  {
    accessorKey: "stage_score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Score
          <FaArrowUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell({ row }) {
      const score = row.getValue("stage_score");
      return (
        <div className="font-medium">{Number(score).toLocaleString()}</div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-left">Date</div>,
  },
];
