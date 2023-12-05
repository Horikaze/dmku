import currentReplay from "@/app/zustand/currentReplay";
import { Toggle } from "@/components/ui/toggle";
import { getCharacterFromData } from "@/lib/getRankingData";
import { Replay } from "@prisma/client";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { FaTrash } from "react-icons/fa";
export default function CompareItem({ replay }: { replay: Replay }) {
  const { addReplay, removeReplay } = currentReplay();
  return (
    <div className="flex font-light text-sm justify-between px-2 py-1 rounded-md border">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <p className="font-semibold pb-1">{replay.rpy_name} </p>
          <p>Player: {replay.player}</p>
          <p>
            Character:{" "}
            {getCharacterFromData(replay.character!, replay.shottype!)}
          </p>
          <p>Rank: {replay.rank}</p>
          <p>Score: {replay.score?.toLocaleString()}</p>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div
            className="cursor-pointer hover:bg-secondary px-3 py-3 rounded-lg"
            onClick={() => {
              removeReplay(replay);
            }}
          >
            <FaTrash className="h-4 w-4" />
          </div>

          <Toggle
            onPressedChange={(e) => {
              console.log(e);
            }}
          >
            Select
          </Toggle>
        </div>
      </div>
    </div>
  );
}
