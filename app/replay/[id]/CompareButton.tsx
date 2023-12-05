"use client";
import currentReplay from "@/app/zustand/currentReplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Replay } from "@prisma/client";
import { FaCodeCompare } from "react-icons/fa6";

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
      <FaCodeCompare />
      Add to compare
    </Button>
  );
}
