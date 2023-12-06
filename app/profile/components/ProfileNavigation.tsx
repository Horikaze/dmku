"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  FaGamepad,
  FaGear,
  FaPlus,
  FaUser
} from "react-icons/fa6";
export default function ProfileNavigation() {
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
    ],
    [pathName]
  );
  return (
    <div className="flex w-full flex-col p-3">
      <div className="flex flex-row flex-1 justify-between border">
        {tabs.map(({ icon: Icon, label, active }) => {
          if (label === "Profile") {
            return (
              <Link
                href={`/profile`}
                key={label}
                className={`py-3 px-4 flex flex-row gap-x-1 items-center md:px-10 cursor-pointer hover:bg-secondary rounded ${
                  active && "bg-secondary"
                }`}
              >
                <Icon />
                <p className="hidden md:block">{label}</p>
              </Link>
            );
          }
          return (
            <Link
              href={`/profile/${label.toLocaleLowerCase()}`}
              key={label}
              className={`py-3 px-4 flex flex-row gap-x-1 items-center md:px-10 cursor-pointer hover:bg-secondary rounded ${
                active && "bg-secondary"
              }`}
            >
              <Icon />
              <p className="hidden md:block">{label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
