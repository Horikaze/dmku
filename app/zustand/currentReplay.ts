import { Replay } from "@prisma/client";
import { create } from "zustand";

interface CurrentReplay {
  replay: Replay[];
  addReplay: (replay: Replay) => void;
  removeReplay: (replay: Replay) => void;
  clear: () => void;
  selectedReplay: Replay[];
  addToCompare: (replay: Replay) => void;
  removeFromCompare: (replay: Replay) => void;
}

const currentReplay = create<CurrentReplay>((set) => ({
  replay: [],
  selectedReplay: [],
  addReplay: (replay) =>
    set((state) => ({
      replay: state.replay.some(
        (currReplay) => currReplay.replayId === replay.replayId
      )
        ? [...state.replay!]
        : [...state.replay!, replay],
    })),
  addToCompare: (replay) =>
    set((state) => ({ selectedReplay: [...state.selectedReplay!, replay] })),
  removeReplay: (replay) =>
    set((state) => ({
      replay: state.replay.filter((item) => item.replayId !== replay.replayId),
      selectedReplay: state.selectedReplay.filter(
        (item) => item.replayId !== replay.replayId
      ),
    })),
  removeFromCompare: (replay) =>
    set((state) => ({
      selectedReplay: state.selectedReplay.filter(
        (item) => item.replayId !== replay.replayId
      ),
    })),
  clear: () => set({ replay: [] }),
}));
export default currentReplay;
