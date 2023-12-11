import { Button } from "@/components/ui/button";
import { convertUnixDate } from "@/lib/getRankingData";

type MultiElementProps = {
  file: File;
  remove: (file: File) => void;
};

export default function MultiElement({ file, remove }: MultiElementProps) {
  return (
    <div className="flex w-full rounded-md border p-2 justify-between">
      <div className="flex flex-col">
        <p>
          File name: <span>{file.name}</span>
        </p>
        <p>
          File date: <span>{convertUnixDate(file.lastModified)}</span>
        </p>
      </div>
      <div className="flex items-center">
        <Button
          onClick={() => {
            remove(file);
          }}
          variant={"ghost"}
          className="font-semibold"
        >
          X
        </Button>
      </div>
    </div>
  );
}
