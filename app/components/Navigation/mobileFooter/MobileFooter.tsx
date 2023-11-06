"use client";
import { useRoutes } from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import ProfileItemMobile from "../ProfileNav";
import { useSession } from "next-auth/react";
const MobileFooter = () => {
  const routes = useRoutes();
  const session = useSession();
  return (
    <div className="lg:hidden flex flex-row bg-sidebarBg">
      <ul className="flex flex-row gap-x-4 justify-evenly w-full">
        {routes.map((item) => {
          if (item.label === "Profile") return null;
          return (
            <MobileItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
            />
          );
        })}
        {session.status === "unauthenticated" && (
          <MobileItem
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

export default MobileFooter;
