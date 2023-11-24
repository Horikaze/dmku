"use client";
import React from "react";
import AuthForm from "./AuthForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const session = useSession();
  if (session.status === "authenticated") {
    redirect("/profile");
  }
  return (
    <div className="flex flex-col justify-center items-center pt-4 lg:pt-8">
      <AuthForm />
    </div>
  );
}
