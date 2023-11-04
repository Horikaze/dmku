"use client";
import { useRoutes } from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
const MobileFooter = () => {
  const routes = useRoutes();
  return (
    <div className="lg:hidden block bg-sidebarBg">
      <ul className="py-2 px-1 flex flex-row gap-x-4 justify-around">
        {routes.map((item) => (
          <MobileItem
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

export default MobileFooter;
