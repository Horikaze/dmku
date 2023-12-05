"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ButtonLoader from "@/app/components/ButtonLoader";
import { deleteReplayAction } from "@/app/lib/serverActions";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

const DeleteReplay = () => {
  const { toast } = useToast();
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (FormData) => {
        ref.current?.reset();
        const { status } = await deleteReplayAction(FormData);
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

      <SubmbitButton />
    </form>
  );
};

export default DeleteReplay;

export const SubmbitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant={"destructive"}>
      <ButtonLoader loading={pending} />
      Delete
    </Button>
  );
};
