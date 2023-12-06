import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ScoreObject,
  getCCstring,
  parseRankingString,
} from "@/lib/getRankingData";
import Link from "next/link";

import { games, touhouDifficulty } from "@/app/constants/games";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Ranking } from "@prisma/client";
type GamesType =
  | "EOSD"
  | "PCB"
  | "IN"
  | "POFV"
  | "MOF"
  | "SA"
  | "UFO"
  | "GFW"
  | "TD"
  | "DDC"
  | "LOLK"
  | "HSIFS"
  | "WBAWC"
  | "UM"
  | "UDOALG";
const difficultyLevels = [
  "EASY",
  "NORMAL",
  "HARD",
  "LUNATIC",
  "EXTRA",
  "PHANTASM",
];
export default function CCTable({ tableData }: { tableData: Ranking }) {
  type MappedArrayType = {
    [key in GamesType]?: ScoreObject;
  };

  let mappedArray: MappedArrayType = {};
  Object.entries(tableData!).forEach(([key, value]) => {
    if (key === "userIdRankingPoints" || key === "total") return;

    if (value && key) {
      const objGameData = parseRankingString(value as string);
      mappedArray[key as GamesType] = objGameData;
    }
  });
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Game</TableHead>
          {touhouDifficulty.map((dif) => {
            if (dif === "Overdrive") return null;
            if (dif === "Phantasm") return null;
            return (
              <TableHead className="text-center border" key={dif}>
                {dif}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game}>
            <TableCell>{game}</TableCell>
            {difficultyLevels.map((difficulty) => {
              if (difficulty === "PHANTASM") {
                return null;
              }
              const score =
                mappedArray[game as keyof MappedArrayType]?.[difficulty]?.score;
              const CC =
                mappedArray[game as keyof MappedArrayType]?.[difficulty]?.CC;
              const id =
                mappedArray[game as keyof MappedArrayType]?.[difficulty]?.id;
              const char =
                mappedArray[game as keyof MappedArrayType]?.[difficulty]?.char;
              const cellClassName =
                CC === 1
                  ? "bg-orange-400"
                  : CC === 2
                  ? "bg-gray-400"
                  : CC === 3
                  ? "bg-purple-400"
                  : CC === 4
                  ? "bg-pink-400"
                  : CC === 5
                  ? "bg-pink-400"
                  : CC === 6
                  ? "bg-yellow-400"
                  : "";

              //extra and phantasm in one cell
              if (game === "PCB" && difficulty === "EXTRA") {
                const phanScore = mappedArray["PCB"]?.["PHANTASM"]?.score;
                const phanCC = mappedArray["PCB"]?.["PHANTASM"]?.CC;
                const phanId = mappedArray["PCB"]?.["PHANTASM"]?.id;
                const phanChar = mappedArray["PCB"]?.["PHANTASM"]?.char;
                const phanCellClassName =
                  phanCC === 1
                    ? "bg-orange-400"
                    : phanCC === 2
                    ? "bg-gray-400"
                    : phanCC === 3
                    ? "bg-purple-400"
                    : phanCC === 4
                    ? "bg-pink-400"
                    : phanCC === 5
                    ? "bg-pink-400"
                    : phanCC === 6
                    ? "bg-yellow-400"
                    : "";

                return (
                  <TableCell
                    key={difficulty}
                    className={`border p-0 flex justify-center min-h-[1px] items-center w-full h-full`}
                  >
                    <div
                      className={`w-full h-[34px] flex justify-between invalid:justify-center`}
                    >
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <Link
                              href={`/replay/${id}`}
                              prefetch={false}
                              className="block w-1/2 border-r hover:brightness-110"
                            >
                              <div
                                className={`flex w-full h-full items-center justify-center ${cellClassName}`}
                              >
                                {CC === 0 ? "" : getCCstring(CC!)}
                              </div>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent className="mb-3 text-center">
                            <p className="font-semibold">Extra</p>
                            <p>{`Score: ${score?.toLocaleString()}`}</p>
                            <p>{char}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <Link
                              href={`/replay/${phanId}`}
                              prefetch={false}
                              className={`block w-1/2 hover:brightness-110 ${phanCellClassName}`}
                            >
                              <div
                                className={`flex w-full h-full items-center justify-center`}
                              >
                                {phanCC === 0 ? "" : getCCstring(phanCC!)}
                              </div>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent className="mb-3 text-center">
                            <p className="font-semibold">Phantasm</p>
                            <p>{`Score: ${phanScore?.toLocaleString()}`}</p>
                            <p>{phanChar}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                );
              }
              return (
                <TableCell
                  key={"phan"}
                  className={`text-center ${cellClassName} border cursor-pointer hover:brightness-110`}
                >
                  <Link href={`/replay/${id}`} prefetch={false}>
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger className="w-full h-full">
                          {CC === 0 ? "" : getCCstring(CC!)}
                        </TooltipTrigger>
                        <TooltipContent className="mb-3">
                          <p>{`Score: ${score?.toLocaleString()}`}</p>
                          <p>{char}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
