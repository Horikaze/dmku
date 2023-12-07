"use client";
import { Input } from "@/components/ui/input";

import { deleteYourReplayAction } from "@/app/lib/serverActions";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
import { SubmitButton } from "./SubmitButton";

const DeleteReplay = () => {
  const { toast } = useToast();
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (FormData) => {
        ref.current?.reset();
        const { status } = await deleteYourReplayAction(FormData);
        return toast({
          description: `${status}`,
        });
      }}
      className="flex justify-end gap-x-2"
    >
      <Input
        type="text"
        id="replayID"
        name="replayID"
        placeholder="Replay ID"
      />

      <SubmitButton text="Delete" variant={"destructive"} />
    </form>
  );
};

export default DeleteReplay;
