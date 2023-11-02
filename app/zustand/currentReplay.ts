import { Replay } from "@prisma/client";
import { create } from "zustand";

interface CurrentReplay {
  replay: Replay | null;
  changeReplay: (replay: Replay) => void;
  clear: () => void;
}

const currentReplay = create<CurrentReplay>((set) => ({
  replay: null,
  changeReplay: (replay) => set(() => ({ replay: replay })),
  clear: () => set({ replay: null }),
}));
export default currentReplay;
