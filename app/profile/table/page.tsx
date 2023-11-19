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
    "OVERDRIVE",
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
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>aha</TableHead>
          {touhouDifficulty.map((dif) => (
            <TableHead key={dif}>{dif}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game}>
            <TableCell>{game}</TableCell>
            {difficultyLevels.map((difficulty) => (
              <TableCell key={difficulty}>
                {
                  mappedArray[game as keyof MappedArrayType]?.[difficulty]
                    ?.score
                }
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
