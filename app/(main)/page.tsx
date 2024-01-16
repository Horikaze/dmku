import AllUsers from "./components/AllUsers";
import MiddleComp from "./components/MiddleComp";
import WeeklyChallenge from "./components/WeeklyChallenge";
import prisma from "@/app/lib/prismadb";
export default async function Home() {
  const main = await prisma.mainPage.findFirst({
    where: {
      id: "0",
    },
  });
  if (!main) {
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
        <MiddleComp />
        <WeeklyChallenge />
      </div>
    </div>
  );
}
