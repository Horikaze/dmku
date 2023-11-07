import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./components/Navigation/Sidebar";
import AuthContext from "./context/AuthContext";
import "./globals.css";
import { ReactQueryContext } from "./context/ReactQueryContext";

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
        <ReactQueryContext>
          <body className={`${inter.className} h-full flex flex-col`}>
            <Sidebar>{children}</Sidebar>
          </body>
        </ReactQueryContext>
      </AuthContext>
    </html>
  );
}
