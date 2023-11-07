import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { FaImage, FaPen } from "react-icons/fa";

export default async function ProfileBanner() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full h-80 flex  relative">
      <Image
        src={
          session?.user.info.profileBanner ||
          "https://static.zerochan.net/RemiSaku.full.2714983.jpg"
        }
        alt="banner"
        fill
        className="opacity-5 object-cover"
      />
      <FaImage
        size={35}
        className="absolute right-1 bottom-1 text-white/10 hover:text-white/100 transition cursor-pointer"
      />
      <div className="absolute bottom-0 p-2 flex flex-row items-end gap-x-4">
        <div className="relative group flex items-center justify-center cursor-pointer">
          <Image
            src={session?.user.info.imageUrl || "/images/placeholder.jpg"}
            alt="PFP"
            width={125}
            height={125}
            className="rounded-full object-cover"
          />
          <FaImage
            size={35}
            className="absolute opacity-0 text-white cursor-pointer group-hover:opacity-50"
          />
        </div>
        <div className="flex flex-row gap-x-1">
          <p className="text-3xl font-bold text-gray-200">
            {session?.user.info.nickname}
          </p>
          <FaPen className="text-gray-400 top-0 cursor-pointer hover:text-gray-100 transition" size={10} />
        </div>
      </div>
    </div>
  );
}
