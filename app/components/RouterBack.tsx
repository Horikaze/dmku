"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function RouterBack() {
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        router.back();
      }}
    >
      <FaArrowLeft className="h-6 w-6" />
    </Button>
  );
}
