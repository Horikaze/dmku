import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "./components/Navigation/Navigation";
import AuthContext from "./context/AuthContext";
import { ReactQueryContext } from "./context/ReactQueryContext";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";

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
            <ToasterContext />
            <Navigation>{children}</Navigation>
          </body>
        </ReactQueryContext>
      </AuthContext>
    </html>
  );
}
