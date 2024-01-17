import { Separator } from "@/components/ui/separator";
import WrTable from "./components/WrTable";
import PointsTesting from "./components/PointsTesting";
import { CCValueRecord, rankValueRecord } from "@/lib/calculatePoints";
const weeklyPoints = [360, 180, 120, 90, 72, 60, 52, 45, 40, 36];
const Info = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-2xl font-semibold" id="points">
        How points are calculate?
      </h2>
      <Separator />
      <p>Points are awarded through a formula:</p>
      <p>
        (YourScore /{" "}
        <a href="/info#wr" className="underline">
          {" "}
          WrScore
        </a>
        ) * RankScore * AchievementScore
      </p>
      <PointsTesting />
      <div className="flex flex-row gap-x-10">
        <div className="flex flex-col">
          <p className="text-center">Rank</p>
          {Object.values(rankValueRecord).map((ele, idx) => (
            <div key={ele + idx} className="flex">
              <p className="w-24">{Object.keys(rankValueRecord)[idx]}</p>
              <p>{ele}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <p className="text-center">Achievement</p>
          {Object.values(CCValueRecord).map((ele, idx) => (
            <div key={ele.toString() + "CC" + idx.toString()} className="flex">
              <p className="w-24">{Object.keys(CCValueRecord)[idx]}</p>
              <p>{ele}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-semibold" id="weekly">
        How do events work?
      </h2>
      <Separator />
      <p>
        The competition is held every week and usually ends around 8 pm on
        Sunday. Points are awarded to the first 10 places only:
      </p>
      <div className="flex flex-col">
        {weeklyPoints.map((ele, idx) => (
          <div key={ele} className="flex">
            <p className="w-10">{idx + 1}.</p>
            <p>{ele} p</p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-semibold" id="wr">
        WR scores table
      </h2>
      <WrTable />
    </div>
  );
};

export default Info;
