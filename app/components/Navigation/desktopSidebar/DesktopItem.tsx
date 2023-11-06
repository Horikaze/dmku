"use client";

import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";

type DesktopItemProps = {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
};

export default function DesktopItem({
  href,
  label,
  icon: Icon,
  active,
}: DesktopItemProps) {
  const textAndIconColor = useMemo(() => {
    const textAndIconColor = clsx(
      "font-medium text-basetext-base group-hover:text-white",
      active ? "font-bold text-black text-white" : "text-slate-500"
    );
    return textAndIconColor;
  }, [active]);

  return (
    <div>
      <Link
        href={href}
        className="
          group relative flex gap-x-3 py-5 justify-center px-4 hover:brightness-125 transition"
      >
        <Icon className={`h-5 w-5 ${textAndIconColor}`} />
        <p className={textAndIconColor}>{label}</p>
        <div
          className={`${
            active ? "block" : "hidden"
          } absolute w-full h-1 bg-orange-500/75 bottom-0`}
        />
      </Link>
    </div>
  );
}
