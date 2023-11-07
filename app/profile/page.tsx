import { getServerSession } from "next-auth/next";
import { getCurrentUserServer } from "../actions/getCurrentUserServer";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Login from "./components/Login/Login";
import ProfileMain from "./components/Profile/ProfileMain";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const currentUser = await getCurrentUserServer(session?.user?.email!);
  if (!session) return <Login />;

  return <ProfileMain />;
}
