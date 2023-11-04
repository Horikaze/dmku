import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaHome } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
export const useRoutes = () => {
  const pathName = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        href: "/",
        icon: FaHome,
        active: pathName === "/",
      },
      {
        label: "Rankings",
        href: "/rankings",
        icon: FaRankingStar,
        active: pathName === "/rankings",
      },
    ],
    [pathName]
  );
  return routes;
};
