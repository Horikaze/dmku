import { format, fromUnixTime } from "date-fns";

export type ScoreObject = {
  EASY?: { score?: number; id?: string };
  NORMAL?: { score?: number; id?: string };
  HARD?: { score?: number; id?: string };
  LUNATIC?: { score?: number; id?: string };
  EXTRA?: { score?: number; id?: string };
};

export const parseRankingString = (scoreString: string): ScoreObject => {
  const scoreObject: ScoreObject = {
    EASY: {},
    NORMAL: {},
    HARD: {},
    LUNATIC: {},
  };

  const scoreParts = scoreString.split("+");

  scoreParts.forEach((part) => {
    const [difficulty, scoreStr, idStr] = part
      .split("/")
      .map((item) => (isNaN(Number(item)) ? item.trim() : item));

    const score = parseFloat(scoreStr);
    const id = idStr.trim();
    if (difficulty && !isNaN(score)) {
      scoreObject[difficulty as keyof ScoreObject] = { score, id };
    }
  });

  return scoreObject;
};

export const stringifyRanking = (scoreObject: ScoreObject): string => {
  const scoreStrings: string[] = [];

  for (const difficulty in scoreObject) {
    if (scoreObject.hasOwnProperty(difficulty)) {
      const { score, id } = scoreObject[difficulty as keyof ScoreObject]!;
      scoreStrings.push(`${difficulty}/${score}/${id}`);
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
    return characters[0];
  }

  return `${characters} ${shotType}`;
};

export const convertUnixDate = (date: number) => {
  if (!date) {
    return "";
  }
  return format(fromUnixTime(date / 1000), "dd-MM-yyyy");
};

export const getCharacterFromDataWithoutType = (
  characters: string | string[]
) => {
  if (!characters) {
    return "";
  }
  if (characters instanceof Array) {
    return characters[0];
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

export const getGameString = (gameCode: string) => {
  switch (gameCode) {
    case "EOSD":
      return 6;
    case "PCB":
      return 7;
    case "IN":
      return 8;
    case "POFV":
      return 9;
    case "MOF":
      return 10;
    case "SA":
      return 11;
    case "UFO":
      return 12;
    case "GFW":
      return 128;
    case "TD":
      return 13;
    case "DDC":
      return 14;
    case "LOLK":
      return 15;
    case "HSIFS":
      return 16;
    case "WBAWC":
      return 17;
    case "UM":
      return 18;
    case "UDOALG":
      return 19;
    default:
      return 6;
  }
};
export const getGameCode = (gameNumber: number) => {
  switch (gameNumber) {
    case 6:
      return "EOSD";
    case 7:
      return "PCB";
    case 8:
      return "IN";
    case 9:
      return "POFV";
    case 10:
      return "MOF";
    case 11:
      return "SA";
    case 12:
      return "UFO";
    case 128:
      return "GFW";
    case 13:
      return "TD";
    case 14:
      return "DDC";
    case 15:
      return "LOLK";
    case 16:
      return "HSIFS";
    case 17:
      return "WBAWC";
    case 18:
      return "UM";
    case 19:
      return "UDOALG";
    default:
      return "EOSD";
  }
};
