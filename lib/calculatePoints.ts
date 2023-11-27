import { scoreWR } from "@/app/constants/wrScores";

export const rankValueRecord: { [key: string]: number } = {
  Easy: 1,
  Normal: 4,
  Hard: 4,
  Extra: 4,
  Lunatic: 7,
  Phantasm: 4,
  overdrive: 3,
};
export const CCValueRecord: { [key: string]: number } = {
  CC: 1,
  NM: 3,
  NB: 3,
  NMNB: 6,
  NNN: 8,
  NNNN: 10,
};

export const calculatePoints = (
  score: number,
  CC: string,
  rank: string,
  game: number
): number => {
  try {
    const CCValue = CCValueRecord[CC!];
    const rankValue = rankValueRecord[rank!];
    const scoreValue = ((score / scoreWR[game][rank]) * 100).toFixed(2);
    const totalScore = Number(scoreValue) * rankValue * CCValue;

    return Number(totalScore.toFixed());
  } catch (error) {
    console.log(error);
    return 0;
  }
};
