import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { games, gamesNumber, touhouDifficulty } from "../constants/games";
import { gameCodeRecord, getGameInt } from "@/lib/getRankingData";
import { scoreWR } from "../constants/wrScores";

const Info = () => {
  return (
    <div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="border">Game </TableHead>
            {touhouDifficulty.map((diff) => {
              if (diff === "Overdrive") return null;
              return (
                <TableHead className="border text-center" key={diff}>
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
                if (diff === "Overdrive") return null;
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
    </div>
  );
};

export default Info;
