import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RankElement from "./RankElement";

type RankingCardData = {
  nickname: string | null;
  imageUrl: string | null;
  points: number | null;
  id: string;
  admin: boolean;
};

const RankingCard = async ({
  title,
  data,
}: {
  title: string;
  data: RankingCardData[];
}) => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-1 h-[500px] overflow-y-scroll">
          {data.map((item, idx) => (
            <RankElement
              user={{
                index: idx,
                imageUrl: item.imageUrl,
                nickname: item.nickname,
                points: item.points,
                id: item.id,
                admin: item.admin,
              }}
              key={idx}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RankingCard;
