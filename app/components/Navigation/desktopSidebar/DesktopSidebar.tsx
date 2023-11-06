"use client";
import { useRoutes } from "@/app/hooks/useRoutes";
import { useSession } from "next-auth/react";
import DesktopItem from "./DesktopItem";
import ProfileNav from "../ProfileNav";

const DesktopSidebar = () => {
  const routes = useRoutes();
  const session = useSession();
  const isProfileVisible = session.status === "authenticated";
  return (
    <div className="hidden lg:flex lg:flex-row bg-sidebarBg px-4">
      <div>
        <div className="flex flex-row gap-x-2">
          {routes.map((item) => {
            if (item.label === "Profile") return null;
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

export default DesktopSidebar;
