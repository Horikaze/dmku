"use client";
import { useRoutes } from "@/app/hooks/useRoutes";
import { useSession } from "next-auth/react";
import DesktopItem from "./DesktopItem";
import ProfileNav from "../ProfileNav";
import { ModeToggle } from "../../ModeToggle";

const DesktopNav = () => {
  const routes = useRoutes();
  const session = useSession();
  const isProfileVisible = session.status === "authenticated";
  return (
    <div className="hidden lg:flex lg:flex-row border-b px-4">
      <div>
        <div className="flex flex-row items-center gap-x-2">
          <p className="text-3xl px-3 font-bold bg-gradient-to-r from-violet-200 to-pink-300 bg-clip-text text-transparent">
            Dmku
          </p>
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
        {isProfileVisible && (
          <ProfileNav
            href={routes[routes.length - 1].href}
            label={routes[routes.length - 1].label}
            active={routes[routes.length - 1].active}
            nav="desktop"
            nickname={session.data.user?.name!}
            src={session.data.user?.image!}
          />
        )}
        {!isProfileVisible && (
          <DesktopItem
            href={routes[routes.length - 1].href}
            label={routes[routes.length - 1].label}
            icon={routes[routes.length - 1].icon}
            active={routes[routes.length - 1].active}
          />
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
