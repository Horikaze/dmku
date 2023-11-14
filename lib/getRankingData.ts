import { format, fromUnixTime } from "date-fns";

export type ScoreObject = {
  difficulty: string;
  score: number;
  id: number;
};

export const parseScoreString = (scoreString: string): ScoreObject[] => {
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
