import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import LoadingState from "../components/LoadingState";
import ProfileNavigation from "./components/ProfileNavigation";
import prisma from "@/app/lib/prismadb";
export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = await prisma.profile.findFirst({
    where: {
      id: session?.user.info.id,
    },
  });
  if (!session || !user) redirect("/login");
  return (
    <div className="flex flex-col h-full items-center gap-y-2">
      <ProfileNavigation session={session} />
      <Suspense fallback={<LoadingState />}>{children}</Suspense>
    </div>
  );
}
