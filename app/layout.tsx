import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "./components/Navigation/Navigation";
import { ThemeProvider } from "./components/theme-provider";
import AuthContext from "./context/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <body
          className={`${inter.className} 
              // bg-cover bg-center
              `}
          // style={{ backgroundImage: "url(images/bg.jpg)" }}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navigation>{children}</Navigation>
          </ThemeProvider>
          <Toaster />
        </body>
      </AuthContext>
    </html>
  );
}
