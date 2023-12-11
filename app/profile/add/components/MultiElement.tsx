import { getLastScore } from "@/app/components/replayTable/forrmatScore";
import { ReplayInfo } from "@/app/types/Replay";
import { Button } from "@/components/ui/button";
import { convertUnixDate, getCharacterFromData } from "@/lib/getRankingData";

type MultiElementProps = {
  file: File;
  remove: (file: File) => void;
  replayData?: ReplayInfo;
  points?: number;
};

export default function MultiElement({
  file,
  remove,
  replayData,
  points,
}: MultiElementProps) {
  return (
    <div className="flex w-full rounded-md border p-2 justify-between overflow-x-scroll">
      <div className="flex flex-col justify-center">
        <p>
          File name: <span>{file.name}</span>
        </p>
        <p>
          File date: <span>{convertUnixDate(file.lastModified)}</span>
        </p>
      </div>
      {replayData && (
        <div className="flex gap-x-10">
          <div>
            <p>
              Character:{" "}
              {getCharacterFromData(replayData.character, replayData.shottype)}
            </p>
            <p>
              Score:{" "}
              {getLastScore(replayData.stage_score.join("+")).toLocaleString()}
            </p>
            <p>Stage: {replayData.stage || "Not supported"}</p>
          </div>
          <div className="flex flex-col">
            <p>Rank: {replayData.rank}</p>
            <p>Player: {replayData.player}</p>
            <p>Slow: {replayData.slow_rate}</p>
          </div>
          <div className="flex justify-center items-center">
            Points: {points}
          </div>
        </div>
      )}
      <div className="flex items-center">
        <Button
          onClick={() => {
            remove(file);
          }}
          variant={"ghost"}
          className="font-semibold"
        >
          X
        </Button>
      </div>
    </div>
  );
}
