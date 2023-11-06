"use client";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
export default function Logged() {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
  });
  if (isLoading) {
    return (
      <div>
        <p>Ładowanie profilu...</p>
      </div>
    );
  }

  return (
    <div>
      <p>{data?.nickname}</p>
      <Image src={data?.imageUrl!} alt="aha" priority width={100} height={100} />
    </div>
  );
}
