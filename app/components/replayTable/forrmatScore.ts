export const getLastNumber = (stageScore: string) => {
  const numbers = stageScore.split("+");
  const lastNumber = numbers[numbers.length - 1];
  return parseFloat(lastNumber);
};
