import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import AuthForm from "./AuthForm";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = await prisma.profile.findFirst({
    where: {
      id: session?.user.info.id,
    },
  });
  if (session && user) redirect("/profile");
  return (
    <div className="flex flex-col justify-center items-center pt-4 lg:pt-8">
      <AuthForm />
    </div>
  );
}
