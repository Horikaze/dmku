import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Session } from "next-auth";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import ProfileImageSettings from "./ProfileImageSettings";
import ProfileSettings from "./ProfileSettings";

type ProfileBannerProps = {
  session: Session;
};

export default async function ProfileBanner({ session }: ProfileBannerProps) {
  return (
    <div className="w-full h-72 flex relative">
      <Image
        src={
          session?.user.info.profileBanner ||
          "https://static.zerochan.net/RemiSaku.full.2714983.jpg"
        }
        alt="banner"
        fill
        className="opacity-30 object-cover"
      />
      <div className="flex flex-row p-2 w-full justify-between">
        <div className="flex flex-col justify-between gap-x-4">
          <div className="w-3/5">
            {session.user.info.bio && (
              <p className="text-white leading-5 text-xs md:text-base break-words opacity-60">
                {session.user.info.bio}
              </p>
            )}
          </div>
          <div className="group flex items-end gap-x-4">
            <Avatar className="w-28 h-28">
              <AvatarImage
                src={session?.user.info.imageUrl || "/images/placeholder.jpg"}
              />
            </Avatar>
            <p className="text-3xl font-semibold text-white drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">
              {session?.user.info.nickname}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end text-white">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <LogoutButton />
                </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {session.user.info.discord && (
            <div className="flex flex-row gap-x-2 items-center opacity-30 mix-blend-plus-lighter ">
              <FaDiscord size={24} />
              <p>{session.user.info.discord}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
