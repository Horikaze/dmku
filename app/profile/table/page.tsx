import prisma from "@/app/lib/prismadb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AchievementRank,
  ScoreObject,
  games,
  getCCstring,
  parseRankingString,
} from "@/lib/getRankingData";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { touhouDifficulty } from "@/app/constants/games";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export default async function TablePage() {
  const session = await getServerSession(authOptions);
  const tableData = await prisma.ranking.findFirst({
    where: {
      userIdRankingPoints: session?.user.info.id,
    },
  });

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
          <TableRow key={game} className="">
            <TableCell>{game}</TableCell>
            {difficultyLevels.map((difficulty) => {
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

              return (
                <TableCell
                  key={difficulty}
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
