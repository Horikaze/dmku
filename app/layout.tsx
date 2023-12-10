import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import AuthContext from "./context/AuthContext";
import "./globals.css";
import CompareReplaySheet from "./components/compare/CompareReplaySheet";
import Navbar from "./components/Navigation/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "dmku",
  description: "aha super",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthContext>
        <body className={`${inter.className}`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar />
            <main className="h-full w-full px-2 md:px-4 lg:px-24 xl:px-36 2xl:px-80 pt-3">
              {children}
            </main>
          </ThemeProvider>
          <CompareReplaySheet />
          <Toaster />
        </body>
        <SpeedInsights />
      </AuthContext>
    </html>
  );
}
