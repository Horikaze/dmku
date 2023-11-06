import Login from "./components/Login/Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getCurrentUserServer } from "../actions/getCurrentUserServer";
import LogoutButton from "./components/LogoutButton";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const currentUser = await getCurrentUserServer(session?.user?.email!);
  if (!session) return <Login />;

  return (
    <div>
      <p>hey {session?.user?.name}</p>
      <p>ok {currentUser?.email}</p>
      <LogoutButton />
    </div>
  );
}
