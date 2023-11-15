import { Games } from "@prisma/client";
import { format, fromUnixTime } from "date-fns";

export type ScoreObject = {
  difficulty: string;
  score: number;
  id: number;
};

export const parseRankingString = (scoreString: string): ScoreObject[] => {
  const scoreParts = scoreString.split("+");

  const scoreObjects = scoreParts.map((part) => {
    const [difficulty, scoreStr, idStr] = part
      .split("/")
      .map((item) => (isNaN(Number(item)) ? item : item.trim()));

    // Use parseFloat to convert the string to a number
    const score = parseFloat(scoreStr);
    const id = parseFloat(idStr);

    return { difficulty, score, id };
  });

  return scoreObjects;
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
  "INA",
  "INB",
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
    case "HSiFS":
      return 16;
    case "WBaWC":
      return 17;
    case "UM":
      return 18;
    case "UDOALG":
      return 19;
    default:
      return 6;
  }
};
