import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useRef, useState } from "react";

export default function MultiReplay() {
  const [files, setFiles] = useState<File[] | null>();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    console.log(e.dataTransfer?.files);
  };
  const handleDragOver = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = e.target.files;

    if (fileList) {
      const fileArray: File[] = Array.from(fileList);
      setFiles(fileArray);
    } else {
      setFiles(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add multiple replays</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="w-full min-h-[10rem] bg-red-400"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p>drop files</p>
          <input
            type="file"
            multiple
            hidden
            onChange={handleFileChange}
            ref={inputRef}
          />
          <Button onChange={() => inputRef.current?.click()}>
            Choose files
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
