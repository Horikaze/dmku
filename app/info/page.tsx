import { Separator } from "@/components/ui/separator";
import WrTable from "./components/WrTable";
import PointsTesting from "./components/PointsTesting";

const Info = () => {
  return (
    <div className="flex flex-col gap-y-2" id="points">
      <h2 className="text-2xl font-semibold">How points are calculate?</h2>
      <Separator />
      <p>Points are awarded through a formula:</p>
      <p>
        (YourScore / <a href="/info#wr"> WrScore</a>) * RankScore *
        AchievementScore
      </p>
      <PointsTesting />
      <WrTable />
    </div>
  );
};

export default Info;
