import { changeReplayStatus } from "@/app/lib/serverActions";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getCCstring,
  getCharacterFromData,
  getDateFromReplay,
} from "@/lib/getRankingData";
import { Replay } from "@prisma/client";
import Link from "next/link";
import { SubmitButton } from "./SubmitButton";

export default function ModReplay({ replay }: { replay: Replay }) {
  return (
    <form
      action={changeReplayStatus}
      className="flex flex-row w-full border justify-between p-3 rounded-md"
    >
      <div className="flex flex-col">
        <p>Touhou: {replay.game}</p>
        <Link href={`/user/${replay.userId}`}>
          <p>
            Sended by: <span className="underline">{replay.player}</span>
          </p>
        </Link>
        <p>Date Added: {getDateFromReplay(replay.uploadedDate!)}</p>
        <p>Rank: {replay.rank}</p>
        <p>
          Character: {getCharacterFromData(replay.character!, replay.shottype!)}
        </p>
        <p>Score: {replay.score?.toLocaleString()}</p>
        <p>Points: {replay.points!}</p>
        <p>Achievement: {getCCstring(replay.achievement!)}</p>
        {replay?.comment!.length > 3 ? <p> {replay?.comment}</p> : null}
        {replay?.videoLink ? (
          <p>
            Video -{" "}
            <Link
              className="font-normal text-gray-400 underline"
              href={replay?.videoLink}
              target="_blank"
            >
              {replay?.videoLink}
            </Link>
          </p>
        ) : null}
        <p>
          Download:{" "}
          <Link className="underline" href={replay.filePath!} download>
            click!
          </Link>{" "}
        </p>
        <p>
          Replay page:{" "}
          <Link className="underline" href={`/replay/${replay.replayId}`}>
            click!
          </Link>
        </p>
      </div>
      <div className="flex flex-col justify-between gap-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" name="status" />
          <label
            htmlFor="terms"
            className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Verified
          </label>
        </div>
        <input
          type="text"
          name="replayId"
          className="hidden"
          defaultValue={replay.replayId}
        />
        <div className="flex justify-end">
          <SubmitButton text="Save" />
        </div>
      </div>
    </form>
  );
}
