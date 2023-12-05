import currentReplay from "@/app/zustand/currentReplay";
import { Checkbox } from "@/components/ui/checkbox";
import { getCharacterFromData } from "@/lib/getRankingData";
import { Replay } from "@prisma/client";
import { FaTrash } from "react-icons/fa";
export default function CompareItem({ replay }: { replay: Replay }) {
  const { removeReplay, addToCompare, removeFromCompare, selectedReplay } =
    currentReplay();
  return (
    <div className="flex text-start font-light text-sm justify-between px-2 py-1 rounded-md border">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <p className="font-semibold pb-1">Touhou: {replay.game} </p>
          <p>Player: {replay.player}</p>
          <p>
            Character:{" "}
            {getCharacterFromData(replay.character!, replay.shottype!)}
          </p>
          <p>Rank: {replay.rank}</p>
          <p>Score: {replay.score?.toLocaleString()}</p>
        </div>
        <div className="flex flex-col justify-between h-full items-end">
          <div
            className="cursor-pointer hover:bg-secondary p-2 rounded-lg"
            onClick={() => {
              removeReplay(replay);
            }}
          >
            <FaTrash className="h-4 w-4" />
          </div>
          <div className="flex items-center space-x-1 my-2">
            <Checkbox
              id={replay.replayId}
              checked={selectedReplay.includes(replay) ? true : false}
              onCheckedChange={(e) => {
                e ? addToCompare(replay) : removeFromCompare(replay);
              }}
            />
            <label
              htmlFor={replay.replayId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Compare
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
