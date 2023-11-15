"use client";

import { achievements } from "@/app/constants/games";
import { ReplayInfo } from "@/app/types/Replay";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { hashFromFile } from "@/lib/fileHash";
import {
  getCharacterFromData,
  getCharacterFromDataWithoutType,
} from "@/lib/getRankingData";
import { Achievement } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const AddReplay = () => {
  const { toast } = useToast();
  const [replay, setReplay] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [replayData, setReplayData] = useState<ReplayInfo | null>(null);
  const [ccInfo, setCcInfo] = useState<Achievement>("CC");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      if (!replayData) {
        throw new Error("No replay data");
      }
      if (!replay) {
        throw new Error("FIle error");
      }

      const formData = new FormData(e.currentTarget);
      formData.append("CC", ccInfo);
      formData.append("score", replayData.stage_score.join("+"));
      formData.append("stage", replayData.stage);
      formData.append(
        "character",
        getCharacterFromDataWithoutType(replayData.character)
      );
      formData.append("type", replayData.shottype);
      const hash = await hashFromFile(replay);
      formData.append("hash", hash);
      const fileInfo = await axios
        .post("/api/uploadreplay", formData)
        .then(() => {
          toast({
            description: "Sended",
          });
        })
        .catch((e) => {
          toast({
            title: "Error",
            description: `${e.response.data}`,
          });
        });
      setReplay(null);
      setReplayData(null);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
      });
    }
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
      <div className="flex flex-row justify-between">
        <CardHeader>
          <CardTitle>Add a replay</CardTitle>
          <CardDescription>Upload your replay here!</CardDescription>
        </CardHeader>
        <div className="pr-6 pt-6 w-1/2">
          <Textarea
            form="form"
            name="comment"
            placeholder="Write something if there are problems with replay, there is desync, or you need additional tools to be able to open it correctly. "
            maxLength={250}
            className="h-2 resize-none"
          ></Textarea>
        </div>
      </div>
      <CardContent>
        <form onSubmit={handleSubmit} id="form">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row justify-between">
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
              <RadioGroup
                defaultValue={achievements[0]}
                className="gap-x-2 flex flex-row items-center"
                onValueChange={(e) => {
                  setCcInfo(e as Achievement);
                }}
              >
                {achievements.map((achiv) => {
                  if (
                    achiv === "NNNN" &&
                    ccInfo !== "NNN" &&
                    ccInfo !== "NNNN"
                  ) {
                    return null;
                  }
                  return (
                    <div key={achiv} className="space-x-1 flex items-center">
                      <RadioGroupItem value={achiv} id={achiv} />
                      <Label htmlFor={achiv}>{achiv}</Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>

            <div className="flex flex-col w-full items-center gap-y-3">
              <Label>{replay?.name || "Replay Info"}</Label>
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
                </div>
                <div className="flex flex-col w-full space-y-3">
                  <Label htmlFor="shotType">Shot-type</Label>
                  <Input
                    id="shotType"
                    readOnly
                    value={getCharacterFromData(
                      replayData?.character!,
                      replayData?.shottype!
                    )}
                  />
                  <Label htmlFor="slowRate">Slow rate</Label>
                  <Input
                    id="slowRate"
                    name="slowRate"
                    readOnly
                    value={replayData?.slow_rate || ""}
                  />
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    readOnly
                    value={replayData?.date || ""}
                    name="date"
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
            <Button type="submit" disabled={replayData === null || loading}>
              <PulseLoader size={6} loading={loading} />
              Upload
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddReplay;
