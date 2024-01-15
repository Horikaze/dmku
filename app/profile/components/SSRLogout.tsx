import { signOut } from "next-auth/react";
import React from "react";

export default function SSRLogout() {
  signOut();
  return <></>;
}
