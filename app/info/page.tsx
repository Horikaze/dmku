"use client";
import { getSession, useSession } from "next-auth/react";
import React from "react";

const Info = () => {
  const session = useSession();

  console.log(session.data?.user.info);

  return (
    <div>
      <p>info page</p>
    </div>
  );
};

export default Info;
