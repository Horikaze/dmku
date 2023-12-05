"use client";
import currentReplay from "@/app/zustand/currentReplay";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaCodeCompare } from "react-icons/fa6";
import CompareItem from "./CompareItem";
import { Button } from "@/components/ui/button";
export default function CompareReplaySheet() {
  const { addReplay, clear, replay } = currentReplay();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <FaCodeCompare className="h-7 w-7 fixed top-20 right-2 cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Compare replays</SheetTitle>
          <SheetDescription></SheetDescription>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-y-2">
              {replay?.length !== 0
                ? replay?.map((rpy) => (
                    <CompareItem key={rpy.replayId} replay={rpy} />
                  ))
                : "No replays selected"}
            </div>
            <Button
              className="absolute w-4/5 items-center bottom-0 left-0 right-0 mb-5 mx-auto"
              onClick={() => {
                console.log(replay);
              }}
            >
              Compare
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
