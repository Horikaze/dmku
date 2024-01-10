import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getGameInt } from "@/lib/getRankingData";
import { games, touhouDifficulty } from "../../constants/games";
import { scoreWR } from "../../constants/wrScores";
import Link from "next/link";

export default function WrTable() {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-center text-xl font-semibold">WR Scores</h2>
      <Table className="border text-xs md:text-base">
        <TableHeader>
          <TableRow>
            <TableHead className="border">Game </TableHead>
            {touhouDifficulty.map((diff) => {
              if (diff === "Phantasm") return null;
              return (
                <TableHead
                  className="border text-center font-semibold"
                  key={diff}
                >
                  {diff}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game}>
              <TableCell className="border">{game}</TableCell>
              {touhouDifficulty.map((diff) => {
                if (diff === "Phantasm") return null;
                if (diff === "Extra" && game === "PCB") {
                  return (
                    <TableCell
                      key={diff}
                      className="border text-xs flex flex-col"
                    >
                      E:{" "}
                      {(scoreWR[getGameInt(game)][diff] || "").toLocaleString()}
                      <p>
                        {" "}
                        P: {(scoreWR[7]["Phantasm"] || "").toLocaleString()}
                      </p>
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={diff} className="border">
                    {(scoreWR[getGameInt(game)][diff] || "").toLocaleString()}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col">
        <Link
          href="https://maribelhearn.com/wr"
          target="_blank"
          className="text-end text-sm underline"
        >
          Source: https://maribelhearn.com/wr
        </Link>
        <p className="text-end text-sm">Date: 20.07.2023</p>
      </div>
    </div>
  );
}
