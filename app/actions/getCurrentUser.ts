import prisma from "@/app/lib/prismadb";
import axios from "axios";
import { getSession } from "next-auth/react";
export const getCurrentUser = async () => {
  const session = await getSession();
  const { email } = session?.user!;
  try {
    const user = await axios.post("/api/getuser", {
      email: email,
    });
    const user2 = await user.data;
    console.log(user2);
  } catch (error) {
    console.log(error);
    return null;
  }
};
