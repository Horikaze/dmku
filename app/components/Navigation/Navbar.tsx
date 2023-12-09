"use client";
import { useRoutes } from "@/app/hooks/useRoutes";
import { useSession } from "next-auth/react";
import NavProfileImage from "./NavProfileImage";
import DesktopItem from "./DesktopItem";
import Link from "next/link";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const routes = useRoutes();
  const session = useSession();
  const isAuth = session.status === "authenticated";
  return (
    <div className="flex flex-row border-b px-4">
      <div className="flex flex-row items-center gap-x-2">
        <Link
          href={"/"}
          className="text-3xl px-3  font-bold bg-gradient-to-r from-violet-200 to-pink-300 bg-clip-text text-transparent"
        >
          Dmku
        </Link>
        <div className="flex-row items-center gap-x-2 md:flex hidden ">
          {routes.map((item) => {
            if (item.label === "Login") return null;
            return (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-row w-full justify-end">
        <MobileNav />
        {isAuth && (
          <NavProfileImage
            href={routes.at(-1)!.href}
            label={routes.at(-1)!.label}
            active={routes.at(-1)!.active}
            nickname={session.data.user?.name!}
            src={session.data.user?.image!}
          />
        )}
        <div className="md:block hidden">
          {!isAuth && (
            <DesktopItem
              href={routes.at(-1)!.href}
              label={routes.at(-1)!.label}
              icon={routes.at(-1)!.icon}
              active={routes.at(-1)!.active}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
