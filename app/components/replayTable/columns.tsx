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
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
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
