import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaGamepad, FaTableCells, FaUser } from "react-icons/fa6";
export const useRoutesInProfile = () => {
  const pathName = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "/profile",
        href: "/profile",
        icon: FaUser,
        active: pathName === "/profile",
      },
      {
        label: "Table",
        href: "/profile/table",
        icon: FaTableCells,
        active: pathName === "/profile/table",
      },
      {
        label: "Settings",
        href: "/profile/settings",
        icon: FaTableCells,
        active: pathName === "/profile/settings",
      },
      {
        label: "Replays",
        href: "/profile/replays",
        icon: FaGamepad,
        active: pathName === "/profile/replays",
      },
    ],
    [pathName]
  );
  return routes;
};
