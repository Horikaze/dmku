import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prismadb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ScoreObject,
  games,
  parseRankingString,
  touhouDifficulty,
} from "@/lib/getRankingData";
import { getServerSession } from "next-auth";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    if (key === "userIdRankingPoints") return;

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
                CC === "CC"
                  ? "bg-orange-400"
                  : CC === "NM"
                  ? "bg-gray-400"
                  : CC === "NB"
                  ? "bg-purple-400"
                  : CC === "NMNB"
                  ? "bg-pink-400"
                  : CC === "NNN"
                  ? "bg-pink-400"
                  : CC === "NNNN"
                  ? "bg-yellow-400"
                  : "";

              return (
                <TableCell
                  key={difficulty}
                  className={`text-center ${cellClassName} border cursor-pointer hover:brightness-110`}
                >
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger className="w-full h-full">
                        <Link href={`/replay/${id}`} prefetch={false}>
                          {CC === "null" ? "" : CC}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className="mb-3">
                        <p>{`Score: ${score?.toLocaleString()}`}</p>
                        <p>{char}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
