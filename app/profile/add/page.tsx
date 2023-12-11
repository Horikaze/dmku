"use client";
import AddReplay from "./components/AddReplay";
import MultiReplay from "./components/MultiReplay";

export default function page() {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      {/* <AddReplay /> */}
      <MultiReplay />
    </div>
  );
}
