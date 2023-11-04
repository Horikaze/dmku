"use client";

import clsx from "clsx";
import Link from "next/link";

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
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          "group flex gap-x-3 rounded-md p-3 text-sm font-semibold items-center text-gray-500 hover:text-black hover:bg-gray-200 mx-1",
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon className="h-6 w-6" />
        <p>{label}</p>
      </Link>
    </li>
  );
}
