import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useRef, useState } from "react";
import MultiElement from "./MultiElement";
import { useToast } from "@/components/ui/use-toast";
import ButtonLoader from "@/app/components/ButtonLoader";
import { ReplayInfo } from "@/app/types/Replay";
import axios from "axios";
import {
  getCharacterFromDataWithoutType,
  getGameNumber,
} from "@/lib/getRankingData";
import { calculatePoints } from "@/lib/calculatePoints";
import { getLastScore } from "@/app/components/replayTable/forrmatScore";

type ReplayDataWithLastMod = {
  data?: ReplayInfo;
  last?: number;
  points?: number;
};

export default function MultiReplay() {
  const [files, setFiles] = useState<File[]>([]);
  const [filesData, setFilesData] = useState<ReplayDataWithLastMod[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const isDuplicateFile = (files: File[], newFile: File): boolean => {
    return files.some((file) => file.lastModified === newFile.lastModified);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (loading) {
      return;
    }
    e.preventDefault();
    if (files.length >= 5) {
      toast({
        title: "Max replays 5",
      });
      return;
    }
    const newFiles = Array.from(e.dataTransfer?.files || []);
    const uniqueNewFiles = newFiles.filter(
      (file) => !isDuplicateFile(files, file)
    );
    setFiles((prev) => [...prev, ...uniqueNewFiles].slice(0, 5));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) {
      return;
    }
    const fileList: FileList | null = e.target.files;
    if (files.length >= 5) {
      toast({
        title: "Max replays 5",
      });
      return;
    }
    if (fileList) {
      const fileArray: File[] = Array.from(fileList);
      const uniqueFileArray = fileArray.filter(
        (file) => !isDuplicateFile(files, file)
      );
      setFiles((prev) => [...prev, ...uniqueFileArray].slice(0, 5));
    }
  };

  const handleDragOver = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const removeElement = (element: File) => {
    setFiles((prev) =>
      prev.filter((file) => file.lastModified !== element.lastModified)
    );
  };

  const threp = async (file: File) => {
    if (!file) {
      throw new Error("File is corrupted.");
    }
    const existingData = filesData.find(
      (data) => data.last === file.lastModified
    )?.data
    if (existingData) {
      return existingData;
    }
    console.log(existingData);
    const formData = new FormData();
    formData.append("replay", file);
    const res = await axios.post("/api/threp", formData);
    const data = res.data as ReplayInfo;
    return data;
  };

  const sendReplayData = async (file: File) => {
    const replayData = filesData.find(
      (data) => data.last === file.lastModified
    )?.data;
    const points = filesData.find(
      (data) => data.last === file.lastModified
    )?.points;
    if (!replayData || !points) {
      toast({
        title: "Click Read all first",
      });
      return;
    }

    const formData = new FormData();
    formData.append("CC", "CC");
    formData.append("score", replayData.stage_score.join("+"));
    formData.append("stage", replayData.stage);
    formData.append("points", points.toString());
    formData.append("rank", replayData.rank);
    formData.append("fileDate", file.lastModified.toString());
    formData.append(
      "character",
      getCharacterFromDataWithoutType(replayData.character)
    );
    formData.append("type", replayData.shottype);

    formData.append("player", replayData.player);
    formData.append("selectReplay", file);

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
      })
      .finally(() => {
        setFiles((prev) =>
          prev.filter(
            (arrayFile) => arrayFile.lastModified !== file.lastModified
          )
        );
      });
  };

  const sendAllReplays = async () => {
    setLoading(true);
    for (const fileToSend of files) {
      await sendReplayData(fileToSend);
    }
    setLoading(false);
  };

  const readReplaysData = async () => {
    setLoading(true);
    try {
      for (const element of files) {
        const replayData = await threp(element);
        const points = calculatePoints(
          getLastScore(replayData ? replayData!.stage_score.join("+") : "0"),
          "CC",
          replayData?.rank!,
          getGameNumber(element?.name!)
        );

        setFilesData((prev) => [
          ...prev,
          { data: replayData, last: element.lastModified, points: points },
        ]);
      }
    } catch (error) {
      toast({
        title: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add multiple replays</CardTitle>
        <CardDescription>
          Use this only if the replays are 1cc, and do not require any
          additional information. Max 5 replays per sending
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="w-full min-h-[10rem] rounded-md p-3 flex flex-col gap-y-2"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div
            className="w-full flex justify-center border py-5 cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <p className="font-semibold">Drop or select .rpy here</p>
          </div>

          {files.length ? (
            <div className="flex w-full flex-col gap-y-2 overflow-y-scroll max-h-[32rem]">
              {Array.from(files!).map((file) => (
                <MultiElement
                  file={file}
                  key={file.lastModified}
                  remove={removeElement}
                  replayData={
                    filesData.find((data) => data.last === file.lastModified)
                      ?.data
                  }
                  points={
                    filesData.find((data) => data.last === file.lastModified)
                      ?.points!
                  }
                />
              ))}
            </div>
          ) : null}
          <div className="w-full flex justify-between px-1">
            <Button
              disabled={loading}
              variant={"outline"}
              onClick={() => {
                setFiles([]);
              }}
            >
              Clear
            </Button>
            <Button
              variant={"outline"}
              disabled={loading}
              onClick={readReplaysData}
            >
              Read all
            </Button>
            <Button onClick={sendAllReplays} disabled={loading}>
              <ButtonLoader loading={loading} />
              Send
            </Button>
          </div>
          <input
            type="file"
            accept=".rpy"
            multiple
            hidden
            onChange={handleFileChange}
            ref={inputRef}
          />
        </div>
      </CardContent>
    </Card>
  );
}
