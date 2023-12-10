import {
  getCCstring,
  getCharacterFromData,
  getCharacterFromDataWithoutType,
  getDateFromReplay,
  getGameString,
} from "@/lib/getRankingData";
import { Replay } from "@prisma/client";
import Link from "next/link";

export default function ReplayItem({ replay }: { replay: Replay }) {
  const scoreParse = () => {
    if (replay?.stage_score?.includes("+")) {
      const scoreParts = replay.stage_score.split("+");
      return scoreParts;
    }
  };
  const chara =
    replay.game === 9
      ? getCharacterFromDataWithoutType(replay.character!)
      : getCharacterFromData(replay.character!, replay.shottype!) || "";

  const score = scoreParse();
  return (
    <div className={`flex flex-col gap-y-2`}>
      <div>
        <p className="text-center font-semibold">{replay.rpy_name}</p>
        <p className="font-light text-center text-xs">{replay.replayId}</p>
      </div>
      <div className="font-semibold">
        Player -{" "}
        <Link
          href={`/user/${replay.userId}`}
          className="font-normal underline "
        >
          {replay?.player}
        </Link>
      </div>
      <div className="font-semibold">
        Game -{" "}
        <span className="font-normal ">
          Touhou: {getGameString(replay.game!)}
        </span>
      </div>
      <div>
        Character - <span className="font-normal ">{chara}</span>
      </div>
      <div>
        Rank - <span className="font-normal ">{replay?.rank}</span>
      </div>
      <div>
        Slow rate - <span className="font-normal ">{replay?.slowRate}</span>
      </div>
      <div>
        Achievement -{" "}
        <span className="font-normal ">
          {getCCstring(replay?.achievement!)}
        </span>
      </div>
      <div>
        Stage -{" "}
        <span className="font-normal ">{replay.stage || "Not supported"}</span>
      </div>
      <div>
        Added -{" "}
        <span className="font-normal ">
          {getDateFromReplay(replay.uploadedDate!)}
        </span>
      </div>
      <div> 
        Replay Date -{" "}
        <span className="font-normal ">
          {getDateFromReplay(replay.fileDate!)}
        </span>
      </div>
      <div>
        Points - <span className="font-normal ">{replay?.points}</span>
      </div>
      <div>
        Status - <span className="font-normal ">{replay?.status}</span>
      </div>
      <div className="flex flex-col gap-y-2">
        <div>
          Score -{" "}
          <span className="font-normal ">
            {Number(replay.score).toLocaleString()}
          </span>
        </div>
      </div>
      {replay?.comment!.length > 3 ? (
        <div>
          Comment - <span className="font-normal ">{replay?.comment}</span>
        </div>
      ) : null}
      {replay?.videoLink ? (
        <div>
          Video -{" "}
          <Link
            className="font-normal  underline"
            href={replay?.videoLink}
            target="_blank"
          >
            {replay?.videoLink}
          </Link>
        </div>
      ) : null}
      <div>
        <Link className="underline" href={replay.filePath!} download>
          Download rpy
        </Link>{" "}
      </div>
    </div>
  );
}
