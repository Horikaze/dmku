"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ButtonLoader from "@/app/components/ButtonLoader";
import { deleteReplayAction } from "@/app/lib/serverActions";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

const DeleteReplay = () => {
  const { toast } = useToast();
  const ref = useRef<HTMLFormElement>(null);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form
          ref={ref}
          action={async (FormData) => {
            ref.current?.reset();
            const { status } = await deleteReplayAction(FormData);
            return toast({
              description: `${status}`,
            });
          }}
          className="flex flex-col items-end gap-y-3"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="replayID">Delete Replay</Label>
            <Input
              type="text"
              id="replayID"
              name="replayID"
              placeholder="Replay ID"
            />
          </div>
          <SubmbitButton />
        </form>
      </PopoverContent>
    </Popover>
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
