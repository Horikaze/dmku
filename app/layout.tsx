import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import AuthContext from "./context/AuthContext";
import "./globals.css";
import prisma from "@/app/lib/prismadb";
import CompareReplaySheet from "./components/compare/CompareReplaySheet";
import Navbar from "./components/Navigation/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dmku",
  description: "aha super",
};
export const revalidate = 3600;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainPage = await prisma.mainPage.findFirst({
    select: {
      background: true,
    },
  });
  return (
    <html lang="en">
      <AuthContext>
        <body className={`${inter.className} relative`}>
          <Image
            src={mainPage?.background || ""}
            alt="bg"
            fill
            className="-z-20 opacity-10 absolute object-cover object-center"
          />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar />
            <main className="h-full w-full px-2 md:px-4 lg:px-24 xl:px-36 2xl:px-72 pt-3">
              {children}
              <SpeedInsights />
            </main>
          </ThemeProvider>
          <CompareReplaySheet />
          <Toaster />
        </body>
      </AuthContext>
    </html>
  );
}
