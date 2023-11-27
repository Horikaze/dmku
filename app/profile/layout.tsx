import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import LoadingState from "../components/LoadingState";
import ProfileBanner from "./components/Profile/components/ProfileBanner";
import ProfileNavigation from "./components/ProfileNavigation";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <main className="flex flex-col h-full items-center">
      {/* <ProfileBanner session={session} /> */}
      <ProfileNavigation />
      <Suspense fallback={<LoadingState />}>{children}</Suspense>
    </main>
  );
}
