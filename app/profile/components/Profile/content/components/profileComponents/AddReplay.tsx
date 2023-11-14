"use client";

import { ReplayInfo } from "@/app/types/Replay";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { convertUnixDate, getCharacterFromData } from "@/lib/getRankingData";
import axios from "axios";
import { format, fromUnixTime } from "date-fns";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const AddReplay = () => {
  const { toast } = useToast();
  const [replay, setReplay] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [replayData, setReplayData] = useState<ReplayInfo | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  const readReplayData = async () => {
    try {
      setLoading(true);
      if (!replay) {
        throw new Error("File is corrupted.");
      }
      const formData = new FormData();
      formData.append("replay", replay);
      const res = await axios.post("/api/threp", formData);
      const data = res.data as ReplayInfo;
      setReplayData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Error",
        description: `${error}`,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add a replay</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row space-x-3">
              <Label
                className={`${buttonVariants({
                  variant: "default",
                })} cursor-pointer`}
                htmlFor="selectReplay"
              >
                Select a replay file
              </Label>
              <input
                type="file"
                onChange={(e) => setReplay(e.target.files![0])}
                multiple={false}
                className="hidden"
                id="selectReplay"
                accept=".rpy"
                name="selectReplay"
              />
              {replay && (
                <Button
                  type="button"
                  onClick={readReplayData}
                  className="space-x-2"
                >
                  <PulseLoader size={6} loading={loading} />
                  <p>Read file</p>
                </Button>
              )}
            </div>

            <div className="flex flex-col w-full items-center gap-y-3">
              <Label>Replay Info</Label>
              <div className="flex flex-row gap-x-4 w-full">
                <div className="flex flex-col w-full space-y-3">
                  <Label htmlFor="player">Player</Label>
                  <Input
                    id="player"
                    name="player"
                    readOnly
                    value={replayData?.player || ""}
                  />

                  <Label htmlFor="score">Score</Label>

                  <Input
                    id="score"
                    name="score"
                    readOnly
                    value={
                      replayData?.stage_score[
                        replayData?.stage_score.length - 1
                      ] || ""
                    }
                  />
                  <Label htmlFor="rank">Rank</Label>
                  <Input
                    id="rank"
                    readOnly
                    value={replayData?.rank || ""}
                    name="rank"
                  />
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    readOnly
                    value={replayData?.date || ""}
                    name="date"
                  />
                </div>
                <div className="flex flex-col w-full space-y-3">
                  <Label htmlFor="player">Player</Label>
                  <Input
                    id="player"
                    name="player"
                    readOnly
                    value={replayData?.player || ""}
                  />
                  <Label htmlFor="shotType">Shot-type</Label>
                  <Input
                    id="shotType"
                    name="shotType"
                    readOnly
                    value={getCharacterFromData(
                      replayData?.character!,
                      replayData?.shottype!
                    )}
                  />
                  <Label htmlFor="stage">Stage</Label>
                  <Input
                    id="stage"
                    readOnly
                    value={replayData?.stage || ""}
                    name="stage"
                  />
                  <Label htmlFor="slowRate">Slow rate</Label>
                  <Input
                    id="slowRate"
                    name="slowRate"
                    readOnly
                    value={replayData?.slow_rate || ""}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setReplayData(null);
              }}
            >
              Reset
            </Button>
            <Button type="submit" disabled={replayData === null}>
              Upload
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddReplay;
