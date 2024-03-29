"use client";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaCheck, FaGamepad, FaGear, FaPlus, FaUser } from "react-icons/fa6";

export default function ProfileNavigation({ session }: { session: Session }) {
  const pathName = usePathname();
  const tabs = useMemo(
    () => [
      {
        label: "Profile",
        icon: FaUser,
        active: pathName === "/profile",
      },
      {
        label: "Add",
        icon: FaPlus,
        active: pathName === "/profile/add",
      },
      {
        label: "Replays",
        icon: FaGamepad,
        active: pathName === "/profile/replays",
      },
      {
        label: "Settings",
        icon: FaGear,
        active: pathName === "/profile/settings",
      },
      {
        label: "Moderation",
        icon: FaCheck,
        active: pathName === "/profile/moderation",
      },
    ],
    [pathName]
  );
  return (
    <div className="flex w-full flex-col text-sm md:text-base">
      <div className="flex flex-row gap-x-1 justify-between">
        {tabs.map(({ icon: Icon, label, active }) => {
          if (label === "Moderation" && session.user.info.admin !== true)
            return null;
          if (label === "Profile") {
            return (
              <Link
                href={`/profile`}
                key={label}
                className={`py-2 flex-grow px-4 flex flex-col md:flex-row gap-x-1 items-center justify-center md:px-10 cursor-pointer hover:bg-secondary rounded  ${
                  active && "bg-secondary"
                }`}
              >
                <Icon />
                {label}
              </Link>
            );
          }
          return (
            <Link
              href={`/profile/${label.toLocaleLowerCase()}`}
              key={label}
              className={`py-2 flex-grow px-4 flex flex-col md:flex-row gap-x-1 items-center justify-center md:px-10 cursor-pointer hover:bg-secondary rounded ${
                active && "bg-secondary"
              }`}
            >
              <Icon />
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
