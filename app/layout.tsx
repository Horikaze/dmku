import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "./components/Navigation/Navigation";
import { ThemeProvider } from "./components/theme-provider";
import AuthContext from "./context/AuthContext";
import "./globals.css";
import CompareReplaySheet from "./components/compare/CompareReplaySheet";

const inter = Inter({ subsets: ["latin"], weight:"500" });

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
            <Navigation>{children}</Navigation>
          </ThemeProvider>
          <Toaster />
          <CompareReplaySheet/>
        </body>
      </AuthContext>
    </html>
  );
}
