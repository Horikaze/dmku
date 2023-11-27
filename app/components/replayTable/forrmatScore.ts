export const getLastScore = (stageScore: string) => {
  if (!stageScore) return 0;
  stageScore = stageScore.toString();
  if (stageScore.includes("+")) {
    const numbers = stageScore.split("+");
    const lastNumber = numbers[numbers.length - 1];
    return Number(lastNumber);
  }
  return Number(stageScore);
};
