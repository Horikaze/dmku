"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
type UserPageProps = {
  params: { user: string };
};
const UserPage = ({ params }: UserPageProps) => {
  const session = useSession();
  console.log(session.status);
  return (
    <div>
      <button
        type="button"
        className={`bg-slate-100 hover:bg-slate-300 transition flex flex-row text-sm items-center py-2 px-4 rounded-lg mt-2
    
          `}
        onClick={() => signOut()}
      >
        Wyloguj
      </button>
      <p>{params.user}</p>
    </div>
  );
};

export default UserPage;
