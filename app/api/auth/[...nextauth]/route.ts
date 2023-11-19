import prisma from "@/app/lib/prismadb";
import { Profile } from "@prisma/client";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID as string,
      clientSecret: process.env.DISCORD_SECRET as string,
      authorization: { params: { scope: "identify" } },
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
        const isUserExists = await prisma.profile.findUnique({
          where: {
            email: user.email!,
          },
        });

        if (isUserExists) {
          token.picture = isUserExists?.imageUrl;
          token.name = isUserExists?.nickname;
          token.email = isUserExists?.email;
          token.info = isUserExists!;
        }

        if (!isUserExists) {
          const newUser = await prisma.profile.create({
            data: {
              id: user.id,
              email: user.email!,
              nickname: user.name,
              name: user.name,
              imageUrl: user.image || null,
            },
          });
          const userRanking = await prisma.ranking.create({
            data: {
              DDC: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              EOSD: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              GFW: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              HSIFS:
                "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              IN: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              LOLK: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              MOF: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              PCB: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              POFV: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              SA: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              TD: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              UDOALG:
                "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              UM: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              UFO: "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              WBAWC:
                "EASY/0/0/null/char+NORMAL/0/0/null/char+HARD/0/0/null/char+LUNATIC/0/0/null/char+EXTRA/0/0/null/char+PHANTASM/0/0/null/char+OVERDRIVE/0/0/null/char",
              total: 0,
              userIdRankingPoints: user.id,
            },
          });

          token.picture = newUser?.imageUrl;
          token.name = newUser?.nickname;
          token.email = newUser?.email;
          token.info = newUser!;
        }
      }
      return token;
    },
    session({ token, session }) {
      if (token) {
        session.user.info = token.info;
      }
      return session;
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
