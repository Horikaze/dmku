import RankingCard from "./components/RankingCard";
import prisma from "@/app/lib/prismadb";
const Rankings = async () => {
  const CCData = await prisma.profile.findMany({
    take: 20,
    orderBy: {
      CCCount: "desc",
    },
    select: {
      imageUrl: true,
      nickname: true,
      id: true,
      CCCount: true,
      admin: true,
    },
  });

  const pointsData = await prisma.ranking.findMany({
    take: 20,
    orderBy: {
      Profile: {
        points: "desc",
      },
    },
    select: {
      userIdRankingPoints: true,
      Profile: {
        select: {
          imageUrl: true,
          nickname: true,
          points: true,
          admin: true,
        },
      },
    },
  });
  const updatedCCData = CCData.map((item) => {
    return {
      imageUrl: item.imageUrl!,
      nickname: item.nickname!,
      points: item.CCCount!,
      id: item.id!,
      admin: item.admin!,
    };
  });

  const updatedPointsData = pointsData.map((item) => {
    return {
      imageUrl: item.Profile?.imageUrl!,
      nickname: item.Profile?.nickname!,
      points: item.Profile?.points!,
      id: item.userIdRankingPoints!,
      admin: item.Profile?.admin!,
    };
  });

  return (
    <div className="flex flex-col gap-3 xl:flex-row">
      <RankingCard title="CC ranking" data={updatedCCData} />
      <RankingCard title="Points ranking" data={updatedPointsData} />
    </div>
  );
};

export default Rankings;
