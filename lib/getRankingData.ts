import { format, fromUnixTime } from "date-fns";

export type ScoreObject = {
  EASY: { score?: number; id?: string; CC?: string; char?: string };
  NORMAL: { score?: number; id?: string; CC?: string; char?: string };
  HARD: { score?: number; id?: string; CC?: string; char?: string };
  LUNATIC: { score?: number; id?: string; CC?: string; char?: string };
  EXTRA: { score?: number; id?: string; CC?: string; char?: string };
  PHANTASM?: { score?: number; id?: string; CC?: string; char?: string };
  OVERDRIVE?: { score?: number; id?: string; CC?: string; char?: string };
  [key: string]:
    | { score?: number; id?: string; CC?: string; char?: string }
    | undefined;
};

export const parseRankingString = (scoreString: string): ScoreObject => {
  const scoreObject: ScoreObject = {
    EASY: {},
    NORMAL: {},
    HARD: {},
    LUNATIC: {},
    EXTRA: {},
    PHANTASM: {},
    OVERDRIVE: {},
  };
  const scoreParts = scoreString.split("+");
  scoreParts.forEach((part) => {
    const [difficulty, scoreStr, idStr, CC, char] = part
      .split("/")
      .map((item) => (isNaN(Number(item)) ? item.trim() : item));

    const score = parseFloat(scoreStr);
    const id = idStr.trim();
    if (difficulty && !isNaN(score)) {
      scoreObject[difficulty as keyof ScoreObject] = { score, id, CC, char };
    }
  });

  return scoreObject;
};

export const stringifyRanking = (scoreObject: ScoreObject): string => {
  const scoreStrings: string[] = [];

  for (const difficulty in scoreObject) {
    if (scoreObject.hasOwnProperty(difficulty)) {
      const { score, id, CC, char } =
        scoreObject[difficulty as keyof ScoreObject]!;
      scoreStrings.push(`${difficulty}/${score}/${id}/${CC}/${char}`);
    }
  }
  return scoreStrings.join("+");
};

export const getCharacterFromData = (
  characters: string | string[],
  shotType: string
) => {
  if (!characters) {
    return "";
  }
  if (characters instanceof Array) {
    return characters[0].split(" vs ")[0].replace(/\s/g, "");
  }

  return `${characters} ${shotType}`;
};

export const convertUnixDate = (date: number) => {
  try {
    if (!date) {
      return "";
    }
    return format(fromUnixTime(date / 1000), "dd-MM-yyyy");
  } catch (error) {
    console.log(error);
  }
};

export const getCharacterFromDataWithoutType = (
  characters: string | string[]
) => {
  if (!characters) {
    return "";
  }
  if (characters instanceof Array) {
    return characters[0].split(" vs ")[0].replace(/\s/g, "");
  }

  return characters;
};

export const getGameNumber = (replayName: string) => {
  const game = parseInt(replayName.split("_")[0].substring(2));
  return game;
};

export const games = [
  "EOSD",
  "PCB",
  "IN",
  "POFV",
  "MOF",
  "SA",
  "UFO",
  "GFW",
  "TD",
  "DDC",
  "LOLK",
  "HSIFS",
  "WBAWC",
  "UM",
  "UDOALG",
];

interface AchievementValuesType {
  CC: number;
  NM: number;
  NB: number;
  NMNB: number;
  NNN: number;
  NNNN: number;
  [key: string]: number; // General index signature
}

export const AchievementRank: AchievementValuesType = {
  CC: 1,
  NM: 2,
  NB: 3,
  NMNB: 4,
  NNN: 5,
  NNNN: 6,
};

export const achievementList = ["CC", "NM", "NB", "NMNB", "NNN", "NNNN"];

export const shotTypeList = ["A", "B", "C"];

export const gameCodeRecord: Record<string, number> = {
  EOSD: 6,
  PCB: 7,
  IN: 8,
  POFV: 9,
  MOF: 10,
  SA: 11,
  UFO: 12,
  GFW: 128,
  TD: 13,
  DDC: 14,
  LOLK: 15,
  HSIFS: 16,
  WBAWC: 17,
  UM: 18,
  UDOALG: 19,
};
export const getGameInt = (gameCode: string) => {
  return gameCodeRecord[gameCode] || 6;
};
export const getGameString = (gameNumber: number) => {
  const gameCode = Object.keys(gameCodeRecord).find(
    (key) => gameCodeRecord[key] === gameNumber
  );
  return gameCode || "EOSD";
};

export const touhouDifficulty = [
  "Easy",
  "Normal",
  "Hard",
  "Lunatic",
  "Extra",
  "Phantasm",
  "Overdrive",
];

export const getDateFromReplay = (uploadedDate: Date) => {
  const replayDateString = uploadedDate?.toString();
  const dateObject = new Date(replayDateString!);
  return format(dateObject, "dd-MM-yyyy");
};
