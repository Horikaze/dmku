import RouterBack from "@/app/components/RouterBack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getDateFromReplay } from "@/lib/getRankingData";
import { Profile } from "@prisma/client";
import Image from "next/image";

export default function ProfileHeader({ user }: { user: Profile }) {
  return (
    <Card className="relative">
      <Image
        src={user.profileBanner!}
        alt="profileBanner"
        fill
        className="absolute z-0 object-cover object-center h-full"
      />
      <div className="relative z-10">
        <div className="flex transition-all text-sm md:text-base justify-around rounded-md">
          <div className="flex justify-between w-full">
            <div className="flex w-1/3 rounded-md items-center flex-col gap-y-2 m-3">
              <div className=" bg-secondary/60 rounded-md p-2 w-full flex flex-col items-center  gap-y-2 m-3">
                <Avatar className="h-20 w-20 md:h-24 md:w-24 ">
                  <AvatarImage
                    src={user.imageUrl || "/images/placeholder.jpg"}
                    alt="avatar"
                  />
                  <AvatarFallback>:3</AvatarFallback>
                </Avatar>
                <p>{user.nickname}</p>
                <div className="flex flex-col w-full items-start">
                  <p>CC - {user.CCCount}</p>
                  <p>Points - {user.points}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end m-3 justify-between">
              <div className="bg-secondary/60 rounded-md">
                <RouterBack />
              </div>
              <div className="flex flex-row gap-y-2 items-end">
                <div className="bg-secondary/60 p-3 rounded-l-md">
                  <p>Join date -</p>
                  <p>Discord -</p>
                  <p>Favorite Game -</p>
                </div>
                <div className="flex flex-col items-end bg-secondary/60 p-3 rounded-r-md">
                  <p> {getDateFromReplay(user.joindate as any)}</p>
                  <p> {user.discord || "-"}</p>
                  <p> {user.favoriteGame || "-"}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              textOrientation: "sideways",
              writingMode: "vertical-rl",
            }}
            className="px-1 select-none bg-secondary/30 text-center text-xs md:hover:py-32 xl:hover:py-44 2xl:hover:py-56 transition-all"
          >
            Expand image
          </div>
        </div>
        {user.bio ? (
          <div className="w-full p-5">
            <p>
              <span className="text-sm bg-secondary/30 p-1 rounded-md">
                Bio: {user.bio}
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
