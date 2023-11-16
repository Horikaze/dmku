"use client";

import { Replay } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { getLastNumber } from "./forrmatScore";
import { Button } from "@/components/ui/button";
import { FaArrowUp } from "react-icons/fa";

export const columns: ColumnDef<Replay>[] = [
  {
    accessorKey: "game",
    header: () => <div className="text-left">Game</div>,
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
      const formatted = getLastNumber(score as string).toLocaleString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-left">Date</div>,
  },
];
