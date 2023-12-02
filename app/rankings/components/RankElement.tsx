import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type RankingElement = {
  nickname: string | null;
  imageUrl: string | null;
  points: number | null;
  id: string | number;
  index: number;
};

const RankElement = ({ user }: { user: RankingElement }) => {
  return (
    <Link
      href={`/user/${user.id}`}
      prefetch={false}
      className="w-full gap-x-3 border flex relative p-2 items-center rounded-md hover:bg-secondary"
    >
      <p>{user.index}</p>
      <Avatar>
        <AvatarImage src={user.imageUrl!} alt="avatar" />
        <AvatarFallback>:3</AvatarFallback>
      </Avatar>
      <p className="font-semibold">{user.nickname}</p>
      <p className="absolute right-0 px-3">{user.points}</p>
    </Link>
  );
};

export default RankElement;
