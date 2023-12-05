import prisma from "@/app/lib/prismadb";

export default async function Page({
  searchParams,
}: {
  searchParams: { replay1: string; replay2: string };
}) {
  const replay1 = await prisma.replay.findFirst({
    where: {
      replayId: searchParams.replay1,
    },
  });
  const replay2 = await prisma.replay.findFirst({
    where: {
      replayId: searchParams.replay2,
    },
  });
  console.log(replay1);
  console.log(replay2);
  return <div>hello</div>;
}
