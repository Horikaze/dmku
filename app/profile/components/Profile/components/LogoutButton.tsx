"use client";

import { signOut } from "next-auth/react";
import { RiLogoutBoxRFill } from "react-icons/ri";

export default function LogoutButton() {
  return (
    <RiLogoutBoxRFill
      className="hover:cursor-pointer opacity-80 drop-shadow-[1px_1px_var(--tw-shadow-color)] shadow-black"
      size={24}
      onClick={() => signOut()}
    />
  );
}
