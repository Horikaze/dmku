"use client";

import { ReplayInfo } from "@/app/types/Replay";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

const AddReplay = () => {
  const { toast } = useToast();
  const [replay, setReplay] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [replayData, setReplayData] = useState<ReplayInfo | null>(null);
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
            <div className="flex flex-row">
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
                    <SyncLoader size={6} loading={loading} />
                    <p>Read file</p>
                  </Button>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
};

export default AddReplay;
