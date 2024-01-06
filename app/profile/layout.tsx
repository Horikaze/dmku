import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import LoadingState from "../components/LoadingState";
import ProfileNavigation from "./components/ProfileNavigation";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <div className="flex flex-col h-full items-center">
      <ProfileNavigation session={session} />
      <Suspense fallback={<LoadingState />}>{children}</Suspense>
    </div>
  );
}
