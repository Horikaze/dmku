"use client";

import { signOut } from "next-auth/react";
import { RiLogoutBoxRFill } from "react-icons/ri";

export default function LogoutButton() {
  return (
    <RiLogoutBoxRFill
      className="hover:cursor-pointer opacity-50 mix-blend-difference hover:opacity-70"
      size={24}
      onClick={() => signOut()}
    />
  );
}
