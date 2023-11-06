"use client";
import { useRoutes } from "@/app/hooks/useRoutes";
import { useSession } from "next-auth/react";
import DesktopItem from "./DesktopItem";

const DesktopSidebar = () => {
  const routes = useRoutes();
  const session = useSession();
  return (
    <div className="hidden lg:flex lg:flex-row bg-sidebarBg ">
      <ul className="flex flex-row gap-x-2">
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
        {session.status === "unauthenticated" && (
          <DesktopItem
            href={routes[routes.length - 1].href}
            label={routes[routes.length - 1].label}
            icon={routes[routes.length - 1].icon}
            active={routes[routes.length - 1].active}
          />
        )}
      </ul>
    </div>
  );
};

export default DesktopSidebar;
