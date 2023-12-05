import { Replay } from "@prisma/client";
import currentReplay from "../zustand/currentReplay";

const addRpyToCompare = (replay: Replay) => {
  const { addReplay } = currentReplay();
  addReplay(replay);
};
