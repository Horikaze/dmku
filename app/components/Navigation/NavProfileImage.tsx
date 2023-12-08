import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useMemo } from "react";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { ModeToggle } from "../ModeToggle";
type ProfileNavProps = {
  href: string;
  label: string;
  active?: boolean;
  nickname?: string;
  src?: string;
};

export default function NavProfileImage({
  active,
  src,
  nickname,
}: ProfileNavProps) {
  const textAndIconColor = useMemo(() => {
    const textAndIconColor = clsx(
      "font-semibold",
      active ? "font-bold text-black dark:text-white" : "text-slate-500"
    );
    return textAndIconColor;
  }, [active]);

  const { setTheme, theme } = useTheme();

  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
    }
    if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <div
      className="
        group relative md:flex hidden h-full flex-col py-3 justify-center items-center hover:brightness-110 transition"
    >
      <div className="flex flex-row gap-x-3 items-center">
        <Avatar className="w-[35px] h-[35px]">
          <AvatarImage src={src || "/images/placeholder.jpg"} />
        </Avatar>
        <p className={textAndIconColor}>{nickname}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-full h-full top-0 left-0 absolute" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-3">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <Link href={"/profile"}>
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary py-3 pr-5">
              <div className="flex flex-row gap-x-1 items-center">
                <FaUser className="h-5 w-5" />
                Profile
              </div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-secondary py-3 pr-5"
            onClick={handleClick}
          >
            <ModeToggle />
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer hover:bg-secondary py-3 pr-5"
            onClick={() => {
              signOut();
            }}
          >
            <div className="flex flex-row gap-x-1 items-center">
              <RiLogoutBoxRFill className="h-5 w-5" />
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div
        className={`${
          active ? "block" : "hidden"
        } h-1 w-full bg-orange-500 absolute bottom-0
          `}
      />
    </div>
  );
}
