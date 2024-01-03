"use client";
import currentReplay from "@/app/zustand/currentReplay";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FaCodeCompare } from "react-icons/fa6";
import CompareItem from "./CompareItem";
import { useState } from "react";
export default function CompareReplaySheet() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { addReplay, clear, replay, selectedReplay } = currentReplay();
  const { toast } = useToast();
  const handleCompare = () => {
    if (selectedReplay.length != 2) {
      toast({
        title: "Error",
        description: "Select 2 replays",
      });
      return;
    }
    if (selectedReplay[0].game != selectedReplay[1].game) {
      toast({
        title: "Error",
        description: "Games are not equal",
      });
      return;
    }
    router.push(
      `/compare/0?replay1=${selectedReplay[0].replayId}&replay2=${selectedReplay[1].replayId}`
    );
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        {replay.length > 0 ? (
          <div className="flex hover:bg-secondary py-1 px-3 bg-card gap-x-1 items-center justify-center fixed top-20 right-2 cursor-pointer z-20 border rounded-md">
            <p className="text-lg">{replay.length}</p>
            <FaCodeCompare className="h-5 w-5" />
          </div>
        ) : null}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Compare replays</SheetTitle>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-y-2 h-[calc(100vh-150px)] overflow-y-scroll">
              {replay?.length !== 0
                ? replay?.map((rpy) => (
                    <CompareItem key={rpy.replayId} replay={rpy} />
                  ))
                : "No replays selected"}
            </div>
            <Button
              className="absolute w-4/5 items-center bottom-0 left-0 right-0 mb-5 mx-auto"
              onClick={handleCompare}
            >
              Compare ({selectedReplay.length})
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
