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
}: MobileItemProps) {
  const textAndIconColor = useMemo(() => {
    const textAndIconColor = clsx(
      "font-medium text-sm group-hover:text-white",
      active ? "font-bold text-black text-white" : "text-slate-500"
    );
    return textAndIconColor;
  }, [active]);

  return (
    <div className="w-full">
      <Link
        href={href}
        className="
          group relative flex flex-col p-3 items-center  hover:brightness-125 transition"
      >
        <Icon className={`h-5 w-5 ${textAndIconColor}`} />
        <div
          className={`${
            active ? "block" : "hidden"
          } absolute h-1 w-full bg-orange-500 top-0`}
        />
        <p className={textAndIconColor}>{label}</p>
      </Link>
    </div>
  );
}
