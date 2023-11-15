import { Achievement } from "@prisma/client";

export type ReplayInfo = {
  character: string | string[];
  date: string;
  frame_count: number;
  player: string;
  rank: string;
  rpy_name: string;
  shottype: string;
  slow_rate: number;
  stage: string;
  stage_score: number[];
  shift: number;
  x_keys: number;
  z_keys: number;
  c_keys: number;
};

export type ReplayFormData = {
  CC?: Achievement;
  comment?: string;
  character?: string;
  date?: string;
  player?: string;
  rank?: string;
  selectReplay?: File;
  slowRate?: string;
  type?: string;
  stage?: string;
  score?: string;
  hash?: string;
};
