"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      "font-medium text-sm",
      active ? "font-bold text-black dark:text-white" : "text-slate-500"
    );
    return textAndIconColor;
  }, [active]);

  return (
    <div className={`${nav === "mobile" && "w-full"}`}>
      <Link
        href={href}
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-[35px] h-[35px]">
                <AvatarImage src={src || "/images/placeholder.jpg"} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/profile"}>
                <DropdownMenuItem className="cursor-pointer hover:bg-secondary">
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="cursor-pointer hover:bg-secondary">
                <ModeToggle />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {nav === "desktop" && <p className={textAndIconColor}>{nickname}</p>}
        </div>
        <div
          className={`${
            active ? "block" : "hidden"
          } h-1 w-full bg-orange-500 absolute ${
            nav === "desktop" ? "bottom-0" : "top-0"
          }`}
        />
      </Link>
    </div>
  );
}
