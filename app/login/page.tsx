import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import AuthForm from "./AuthForm";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = await prisma.profile.findFirst({
    where: {
      id: session?.user.info.id,
    },
  });
  console.log(user);
  if (session && user) {
    redirect("/profile");
  }
  return (
    <div className="flex flex-col justify-center items-center pt-4 lg:pt-8">
      <AuthForm />
    </div>
  );
}
