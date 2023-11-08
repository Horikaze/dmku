import { Session } from "next-auth";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
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
          <div className="w-2/5">
            {session.user.info.bio && (
              <p className="text-white leading-5 text-xs md:text-base break-words">
                {session.user.info.bio}
              </p>
            )}
          </div>
          <div className="relative group flex items-end gap-x-3 cursor-pointer">
            <Image
              src={session?.user.info.imageUrl || "/images/placeholder.jpg"}
              alt="PFP"
              width={110}
              height={110}
              className="rounded-full object-cover"
            />
            <p className="text-3xl font-semibold text-white drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">
              {session?.user.info.nickname}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end text-white opacity-30 mix-blend-plus-lighter">
          <ProfileSettings />
          {session.user.info.discord && (
            <div className="flex flex-row gap-x-2 items-center ">
              <FaDiscord size={24} />
              <p>{session.user.info.discord}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
