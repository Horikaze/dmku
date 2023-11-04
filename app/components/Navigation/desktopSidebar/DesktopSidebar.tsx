"use client";
import { useRoutes } from "@/app/hooks/useRoutes";
import DesktopItem from "./DesktopItem";

const DesktopSidebar = () => {
  const routes = useRoutes();
  return (
    <div className="hidden lg:flex lg:flex-col lg:h-full bg-sidebarBg ">
      <ul className="mt-2 mx-1 flex flex-col gap-y-2 w-52">
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
