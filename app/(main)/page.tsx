import prisma from "@/app/lib/prismadb";
import AllUsers from "./components/AllUsers";
import WeeklyChallenge from "./components/WeeklyChallenge";
import Image from "next/image";

export default async function Home() {
  const mainPage = await prisma.mainPage.findFirst();
  if (!mainPage) {
    await prisma.mainPage.create({
      data: {
        id: "0",
      },
    });
  }
  return (
    <div className="flex flex-row md:flex-col w-full items-center justify-center">
      <div className="flex-col md:flex-row flex justify-between w-full items-center md:items-start gap-y-2 md:gap-y-0">
        <AllUsers />
        <WeeklyChallenge />
      </div>
    </div>
  );
}
