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

  return (
    <div>
      Latest user: <p>{mainPage?.latestUser?.nickname}</p>
    </div>
  );
}
