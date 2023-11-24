"use client";

import ButtonLoader from "@/app/components/ButtonLoader";
import { achievementList } from "@/app/constants/games";
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
      formData.append("score", replayData.stage_score.join("+"));
      formData.append("fileDate", replay.lastModified.toString());
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
      setReplay(null);
      setCcInfo("CC");
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
      });
    }
  };

  const checkExisting = async () => {
    try {
      setLoading(true);
      if (!replay) {
        throw new Error("File error");
      }
      const hash = await hashFromFile(replay);
      const ifExist = await axios.post("/api/replayexists", {
        hash: hash,
        score: replayData!.stage_score.join("+"),
      });
      toast({
        title: "Info",
        description: `${ifExist.data}`,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `${error}`,
      });
      setLoading(false);
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
              <div className="flex flex-col xl:items-center xl:flex-row xl:space-x-3 space-y-2 xl:space-y-0 mr-2 xl:mr-0">
                <Label
                  className={`${buttonVariants({
                    variant: "default",
                  })} cursor-pointer text-xs xl:text-base`}
                  htmlFor="selectReplay"
                >
                  Select a replay file
                </Label>
                <input
                  type="file"
                  onChange={(e) => {
                    setReplayData(null);
                    setReplay(e.target.files![0]);
                  }}
                  multiple={false}
                  className="hidden"
                  id="selectReplay"
                  accept=".rpy"
                  name="selectReplay"
                />
                {replay && (
                  <Button
                    type="button"
                    className="text-xs xl:text-base"
                    disabled={loading}
                    onClick={readReplayData}
                  >
                    <ButtonLoader loading={loading} />
                    <p>Read file</p>
                  </Button>
                )}
                {replayData && (
                  <Button
                    type="button"
                    className="text-xs xl:text-base"
                    onClick={checkExisting}
                    disabled={loading}
                  >
                    <ButtonLoader loading={loading} />
                    <p> Check if replay exists</p>
                  </Button>
                )}
              </div>

              <div>
                <RadioGroup
                  defaultValue={achievementList[0]}
                  value={ccInfo}
                  className="flex flex-wrap items-start"
                  onValueChange={(e) => {
                    setCcInfo(e as Achievement);
                  }}
                >
                  {achievementList.map((achiv) => {
                    if (
                      achiv === "NNNN" &&
                      ccInfo !== "NNN" &&
                      ccInfo !== "NNNN"
                    ) {
                      return null;
                    }
                    return (
                      <div key={achiv} className="space-x-1 flex items-center">
                        <RadioGroupItem
                          value={achiv}
                          id={achiv}
                          className="mb-1"
                        />
                        <Label htmlFor={achiv}>{achiv}</Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>

            <div className="flex flex-col w-full items-center gap-y-3">
              <Label className="text-lg">
                {replay?.name || "No file selected"}
              </Label>
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
                      ].toLocaleString() || ""
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
              type="button"
              onClick={() => {
                setReplayData(null);
              }}
            >
              Reset
            </Button>
            <Button type="submit" disabled={replayData === null || loading}>
              <ButtonLoader loading={loading} />
              Upload
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddReplay;
