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
  nav?: "mobile" | "desktop";
};

export default function ProfileNav({
  href,
  label,
  active,
  src,
  nav,
  nickname,
}: ProfileNavProps) {
  const textAndIconColor = useMemo(() => {
    const textAndIconColor = clsx(
      "font-semibold text-sm",
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
    <div className={`${nav === "mobile" && "w-full"}`}>
      <div
        className="
        group relative flex h-full flex-col  justify-center items-center hover:brightness-110 transition"
      >
        <div
          className={`flex ${
            nav === "desktop"
              ? "flex-row gap-x-3 items-center px-2"
              : "flex-col"
          }`}
        >
          <Avatar className="w-[35px] h-[35px]">
            <AvatarImage src={src || "/images/placeholder.jpg"} />
          </Avatar>

          {nav === "desktop" && <p className={textAndIconColor}>{nickname}</p>}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-full h-full top-0 left-0 absolute" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={`${nav === "mobile" ? "mb-12" : "mt-3"}`}
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/profile"}>
              {nav === "desktop" ? (
                <DropdownMenuItem className="cursor-pointer hover:bg-secondary py-3 pr-5">
                  <div className="flex flex-row gap-x-1 items-center">
                    <FaUser className="h-5 w-5" />
                    Profile
                  </div>
                </DropdownMenuItem>
              ) : (
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
              )}
            </Link>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-secondary py-3 pr-5"
              onClick={handleClick}
            >
              <ModeToggle />
            </DropdownMenuItem>
            {nav === "mobile" ? (
              <DropdownMenuItem className="cursor-pointer hover:bg-secondary py-3 pr-5">
                <div className="flex flex-row gap-x-1 items-center">
                  <FaUser className="h-5 w-5" />
                  Profile
                </div>
              </DropdownMenuItem>
            ) : (
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
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div
          className={`${
            active ? "block" : "hidden"
          } h-1 w-full bg-orange-500 absolute ${
            nav === "desktop" ? "bottom-0" : "top-0"
          }`}
        />
      </div>
    </div>
  );
}
