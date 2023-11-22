const calculatePoints = (score: number, CCCount: number, rank: string) => {
  let diffScore = 0;
  switch (rank) {
    case "Easy":
      diffScore = 1;
      break;
    case "Normal":
    case "Extra":
    case "Phantasm":
    case "overdrive":
      diffScore = 2;
      break;
    case "Hard":
      diffScore = 3;
      break;
    case "Lunatic":
      diffScore = 4;
      break;
    default:
      diffScore = 0;
      break;
  }
  const nnnPoints = diffScore >= 3 ? 2 : 1;
  const finalScore = (CCCount >= 1 ? CCCount : 0) * nnnPoints + diffScore;
  console.log(finalScore);
};
