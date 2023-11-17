"use client";

import { Button } from "@/components/ui/button";
import { getGameCode } from "@/lib/getRankingData";
import { Replay } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { FaArrowUp } from "react-icons/fa";

export const columns: ColumnDef<Replay>[] = [
  {
    accessorKey: "game",
    header: () => <div className="text-left">Game</div>,
    cell({ row }) {
      const gameNumber = Number(row.getValue("game"));
      return <div className="font-medium">{getGameCode(gameNumber)}</div>;
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
    header: () => <div className="text-left">Difficulty</div>,
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
