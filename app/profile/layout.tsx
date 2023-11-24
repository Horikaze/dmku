import { getServerSession } from "next-auth";
import { Suspense } from "react";
import LoadingState from "../components/LoadingState";
import Login from "./components/Login/Login";
import ProfileNavigation from "./components/ProfileNavigation";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session)
    return (
      <main>
        <Login />
      </main>
    )

  return (
    <main className="flex flex-col h-full items-center">
      {/* <ProfileBanner session={session} /> */}
      <ProfileNavigation />
      <Suspense fallback={<LoadingState />}>{children}</Suspense>
    </main>
  );
}
