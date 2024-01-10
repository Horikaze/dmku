import prisma from "@/app/lib/prismadb";

export default async function Weekly({ params }: { params: { id: string } }) {
  const weeklyChallenge = await prisma.weeklyChallenge.findFirst({
    where: {
      challengeID: params.id,
    },
  });
  return <div>{JSON.stringify(weeklyChallenge?.results)}</div>;
}
