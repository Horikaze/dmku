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
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <AllUsers />
        <WeeklyChallenge />
      </div>
    </div>
  );
}
