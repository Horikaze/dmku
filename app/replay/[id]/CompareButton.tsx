"use client";
import currentReplay from "@/app/zustand/currentReplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Replay } from "@prisma/client";
import { MdOutlineCompareArrows } from "react-icons/md";

export default function CompareButton({ replay }: { replay: Replay }) {
  const { addReplay } = currentReplay();
  const { toast } = useToast();
  return (
    <Button
      onClick={() => {
        toast({
          description: "Replay added to compare",
        });
        addReplay(replay);
      }}
    >
      <MdOutlineCompareArrows />
      Add to compare
    </Button>
  );
}
