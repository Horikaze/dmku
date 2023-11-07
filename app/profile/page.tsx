import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Login from "./components/Login/Login";
import ProfileMain from "./components/Profile/ProfileMain";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session?.user.info);
  if (!session) return <Login />;

  return <ProfileMain />;
}
