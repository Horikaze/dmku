"use client";
import { useRoutes } from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import ProfileItemMobile from "../ProfileNav";
import { useSession } from "next-auth/react";
import ProfileNav from "../ProfileNav";
const MobileFooter = () => {
  const routes = useRoutes();
  const session = useSession();
  const isProfileVisible = session.status === "authenticated";
  return (
    <div className="lg:hidden flex flex-row bg-secondary">
      <div className="flex flex-row gap-x-4 justify-evenly w-full">
        {routes.map((item) => {
          if (item.label === "Login") return null;
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
        {!isProfileVisible && (
          <MobileItem
            href={routes[routes.length - 1].href}
            label={routes[routes.length - 1].label}
            icon={routes[routes.length - 1].icon}
            active={routes[routes.length - 1].active}
          />
        )}
        {isProfileVisible && (
          <ProfileNav
            href={routes[routes.length - 1].href}
            label={routes[routes.length - 1].label}
            active={routes[routes.length - 1].active}
            nav="mobile"
            nickname={session.data.user?.name!}
            src={session.data.user?.image!}
          />
        )}
      </div>
    </div>
  );
};

export default MobileFooter;
