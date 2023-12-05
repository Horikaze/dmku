import { Replay } from "@prisma/client";

export const ReplayScores = ({
  replay,
  score,
}: {
  replay: Replay;
  score: string[];
}) => {
  return replay?.stage_score?.includes("+") ? (
    <div className=" flex flex-col">
      {score?.map((score, index) => (
        <div key={index}>
          <div className="p-2 items-center text-sm flex flex-col gap-y-1">
            <p>{`Stage ${index + 1}`}</p>
            <p>{Number(score).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="p-2 items-center text-sm flex flex-col gap-y-1">
      <p>Stage 1</p>
      <p>{Number(replay.score).toLocaleString()}</p>
    </div>
  );
};
