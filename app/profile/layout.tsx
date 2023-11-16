import { getServerSession } from "next-auth";
import Login from "./components/Login/Login";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProfileBanner from "./components/Profile/components/ProfileBanner";

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
    );

  return (
    <main className="flex flex-col h-full mx-2 md:mx-4 lg:mx-32 xl:mx-48 2xl:mx-64 pb-20">
      <ProfileBanner session={session} />
      {children}
    </main>
  );
}
