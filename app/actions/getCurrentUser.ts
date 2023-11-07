import { Profile } from "@prisma/client";
import axios from "axios";
import { getSession } from "next-auth/react";
export const getCurrentUser = async () => {
  try {
    const session = await getSession();
    const data = await axios.post("/api/getuser", {
      email: session?.user?.email!,
    });
    const currentUser = await data.data;
    return currentUser as Profile;
  } catch (error) {
    console.log(error);
    return null;
  }
};
