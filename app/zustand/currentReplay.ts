import { Replay } from "@prisma/client";
import { create } from "zustand";

interface CurrentReplay {
  replay: Replay | null;
  changeReplay: (replay: Replay) => void;
  clear: (replay: Replay) => void;
}

const currentReplay = create<CurrentReplay>((set) => ({
  replay: null,
  changeReplay: (replay) => set((state) => ({ replay: replay })),
  clear: (replay) => set((state) => ({ replay: null })),
}));
export default currentReplay;
