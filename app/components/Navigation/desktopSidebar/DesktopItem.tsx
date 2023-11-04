"use client";

import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";

type DesktopItemProps = {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
};

export default function DesktopItem({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: DesktopItemProps) {
  const textAndIconColor = useMemo(() => {
    const textAndIconColor = clsx(
      "font-medium text-sm group-hover:text-white",
      active ? "font-bold text-black text-white" : "text-slate-500"
    );
    return textAndIconColor;
  }, [active]);

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className="
          group relative flex gap-x-3 p-3 items-center bg-sidebarBgItem rounded-sm hover:brightness-125 transition"
      >
        <Icon className={`h-5 w-5 ${textAndIconColor}`} />
        <p className={textAndIconColor}>{label}</p>
        <div
          className={`${
            active ? "block" : "hidden"
          } absolute h-full w-2 bg-orange-500 right-0`}
        />
      </Link>
    </li>
  );
}
