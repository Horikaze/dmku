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
  const [isCustom, setIsCustom] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
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
      setReplayData(res.data);
      setLoading(false);
      console.log(res.data);
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
                    disabled
                    value={replayData?.player || ""}
                  />
                  <div className="flex flex-row justify-between">
                    <Label htmlFor="score">Score</Label>
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <label
                        htmlFor="custom"
                        className="text-xs cursor-pointer"
                      >
                        Threp score is wrong?
                      </label>
                      <Checkbox
                        id="custom"
                        onCheckedChange={() => setIsCustom((prev) => !prev)}
                      />
                    </div>
                  </div>
                  <Input
                    id="score"
                    disabled={!isCustom}
                    value={
                      replayData?.stage_score[
                        replayData?.stage_score.length - 1
                      ].toLocaleString() || ""
                    }
                  />
                  <Label htmlFor="rank">Rank</Label>
                  <Input id="rank" disabled value={replayData?.rank || ""} />
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" disabled value={replayData?.date || ""} />
                </div>
                <div className="flex flex-col w-full space-y-3">
                  <Label htmlFor="player">Player</Label>
                  <Input
                    id="player"
                    disabled
                    value={replayData?.player || ""}
                  />
                  <Label htmlFor="shotType">Shot-type</Label>
                  <Input
                    id="shotType"
                    disabled
                    value={getCharacterFromData(
                      replayData?.character!,
                      replayData?.shottype!
                    )}
                  />
                  <Label htmlFor="stage">Stage</Label>
                  <Input id="stage" disabled value={replayData?.stage || ""} />
                  <Label htmlFor="slowRate">Slow rate</Label>
                  <Input
                    id="slowRate"
                    disabled
                    value={replayData?.slow_rate || 0}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" type="reset">
              Cancel
            </Button>
            <Button type="submit">Upload</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddReplay;
