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
        <body className={`${inter.className}`}>
          <Image
            src={mainPage?.background || ""}
            alt="bg"
            fill
            className="-z-30 opacity-10 object-cover object-center h-full"
          />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar />
            <main className="px-2 md:px-4 lg:px-24 xl:px-36 2xl:px-72 overflow-y-scroll absolute w-full h-full z-10">
              <div className="h-20" />
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
