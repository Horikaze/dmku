"use client";
import { useRoutes } from "@/app/hooks/useRoutes";
import React from "react";
import DesktopItem from "./DesktopItem";

const DesktopSidebar = () => {
  const routes = useRoutes();
  return (
    <div className="hidden lg:flex lg:flex-col lg:h-full bg-slate-100 lg:border-r-[1px] lg:border-slate-300">
      <ul className="mt-2 flex flex-col gap-y-1 w-52">
        {routes.map((item) => (
          <DesktopItem
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={item.active}
          />
        ))}
      </ul>
    </div>
  );
};

export default DesktopSidebar;
