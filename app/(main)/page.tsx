import prisma from "@/app/lib/prismadb";

export default async function Home() {
  const mainPage = await prisma.mainPage.findFirst({
    include: {
      latestUser: {
        select: {
          nickname: true,
        },
      },
    },
  });
  if (!mainPage) {
    await prisma.mainPage.create({
      data: {
        id: "0",
      },
    });
  }
  return (
    <div>
      Latest user: <p>{mainPage?.latestUser?.nickname}</p>
    </div>
  );
}
