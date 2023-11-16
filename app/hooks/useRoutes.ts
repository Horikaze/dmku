import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaHome, FaInfoCircle, FaSearch, FaSignInAlt } from "react-icons/fa";
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
      {
        label: "Search",
        href: "/search",
        icon: FaSearch,
        active: pathName === "/search",
      },
      {
        label: "Info",
        href: "/info",
        icon: FaInfoCircle,
        active: pathName === "/info",
      },
      {
        label: "Login",
        href: "/profile",
        icon: FaSignInAlt,
        active: pathName.startsWith("/profile"),
      },
    ],
    [pathName]
  );
  return routes;
};
