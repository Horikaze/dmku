import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import prisma from "@/app/lib/prismadb";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID as string,
      clientSecret: process.env.DISCORD_SECRET as string,
    }),
    CredentialsProvider({
      name: `credentials`,
      credentials: {
        nickname: { label: `nickname`, type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.nickname || !credentials.password)
          throw new Error("Invalid credentials");
        const user = await prisma.profile.findUnique({
          where: {
            email: credentials?.nickname.replace(/\s/g, "_") + "@dmku.pl",
          },
        });

        if (!user || !user?.hashedPassword)
          throw new Error("Invalid credentials");

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(user.email);
        const isUserExists = await prisma.profile.findUnique({
          where: {
            email: user.email!,
          },
        });
        if (!isUserExists) {
          await prisma.profile.create({
            data: {
              email: user.email,
              nickname: user.name,
              name: user.name,
              imageUrl: user.image || null,
            },
          });
        }
      }

      return token;
    },
  },
  // debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
