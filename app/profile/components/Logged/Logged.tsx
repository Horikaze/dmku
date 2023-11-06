"use client";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import Image from "next/image";
export default function Logged() {
  const { data, isLoading, isError } = useQuery({
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
  if (isError) {
    return (
      <div>
        <p>Błąd...</p>
      </div>
    );
  }

  return (
    <div>
      <p>{data?.nickname}</p>
      <Image
        src={data?.imageUrl || "/images/placeholder.jpg"}
        alt="aha"
        priority
        width={100}
        height={100}
      />
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
