import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/profile",
  },
});

export const config = {
  matcher: ["/profile/:path*"],
};
