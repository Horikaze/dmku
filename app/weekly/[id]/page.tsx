import prisma from "@/app/lib/prismadb";

export default async function Weekly() {
  const chall = await prisma.mainPage.findFirst({
    where: {
      id: "0",
    },
    select: {
      weeklyChallenge: true,
    },
  });
  console.log(chall);
  return <div>{JSON.stringify(chall)}</div>;
}
