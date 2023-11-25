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
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { deleteReplayAction } from "./serverAction";
import { useToast } from "@/components/ui/use-toast";

const DeleteReplay = () => {
  const { pending } = useFormStatus();
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
            if (status === "ERROR") {
              return toast({
                description: "Error while deleting replay",
              });
            }
            return toast({
              description: "Deleted replay",
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
          <Button type="submit" variant={"destructive"}>
            <ButtonLoader loading={pending} />
            Delete
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteReplay;
