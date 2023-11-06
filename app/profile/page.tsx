"use client";
import { signOut, useSession } from "next-auth/react";
import Login from "./components/Login/Login";
import Logged from "./components/Logged/Logged";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <Logged />;
  }
  if (status === "loading") {
    return <p>Ładownanie...</p>;
  }
  return <Login />;
}
