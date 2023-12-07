import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { FaMedal } from "react-icons/fa";
type RankingElement = {
  nickname: string | null;
  imageUrl: string | null;
  points: number | null;
  id: string | number;
  index: number;
  admin:boolean
};
const RankElement = ({ user }: { user: RankingElement }) => {
  const color =
    user.index === 0
      ? "text-yellow-400"
      : user.index === 1
      ? "text-slate-400"
      : user.index === 2
      ? "text-green-900"
      : "";
  return (
    <Link
      href={`/user/${user.id}`}
      prefetch={false}
      className="w-full gap-x-3 border flex relative p-2 items-center rounded-md hover:bg-secondary"
    >
      {user.index === 0 || user.index === 1 || user.index === 2 ? (
        <FaMedal className={color} />
      ) : (
        <p className="px-1">{user.index + 1}</p>
      )}

      <Avatar>
        <AvatarImage src={user.imageUrl!} alt="avatar" />
        <AvatarFallback>:3</AvatarFallback>
      </Avatar>
      <p className={`${user.admin? "bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent" : ""}`}>{user.nickname}</p>
      <p className="absolute right-0 px-3">{user.points}</p>
    </Link>
  );
};

export default RankElement;
