import { Replay } from "@prisma/client";
import { create } from "zustand";

interface CurrentReplay {
  replay: Replay[];
  addReplay: (replay: Replay) => void;
  removeReplay: (replay: Replay) => void;
  clear: () => void;
}

const currentReplay = create<CurrentReplay>((set) => ({
  replay: [],
  addReplay: (replay) =>
    set((state) => ({ replay: [...state.replay!, replay] })),
  removeReplay: (replay) =>
    set((state) => ({
      replay: state.replay.filter((item) => item.replayId !== replay.replayId),
    })),
  clear: () => set({ replay: [] }),
}));
export default currentReplay;
