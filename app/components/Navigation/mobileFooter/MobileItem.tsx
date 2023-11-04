"use client";

import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";

type MobileItemProps = {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
};

export default function MobileItem({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: MobileItemProps) {
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
    <li onClick={handleClick} className="w-full">
      <Link
        href={href}
        className="
          group relative flex flex-col pb-2 pt-3 gap-y-1 items-center bg-sidebarBgItem rounded-sm hover:brightness-125"
      >
        <Icon className={`h-5 w-5 ${textAndIconColor}`} />
        <div
          className={`${
            active ? "block" : "hidden"
          } absolute h-1 w-full bg-orange-500 top-0`}
        />
        <p className={textAndIconColor}>{label}</p>
      </Link>
    </li>
  );
}
