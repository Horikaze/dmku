import { useRoutes } from "@/app/hooks/useRoutes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import { ModeToggle } from "../ModeToggle";

export default function MobileNav() {
  const session = useSession();
  const isAuth = useMemo(
    () => session.status === "authenticated",
    [session.status]
  );
  const routes = useRoutes();
  const [open, setOpen] = useState(false);

  const { setTheme, theme } = useTheme();

  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
    }
    if (theme === "light") {
      setTheme("dark");
    }
  };
  return (
    <div className="group md:hidden relative flex h-full flex-col py-2 justify-center items-center hover:brightness-110 transition">
      <div className="flex flex-row gap-x-3 items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <IoMenuOutline className="h-10 w-10 cursor-pointer" />
          </SheetTrigger>
          <SheetContent className="w-[300px]">
            <div className="flex flex-col gap-y-2 mr-4 mt-4">
              <Link
                onClick={() => {
                  setOpen(false);
                }}
                href={"/profile"}
                className={`rounded-md flex gap-x-2 items-center  cursor-pointer ${
                  routes.at(-1)?.active ? "bg-secondary" : ""
                } hover:bg-secondary p-3 transition-all`}
              >
                <FaUser />
                <p>Profile</p>
              </Link>
              {routes.map(({ active, href, icon: Icon, label }) => {
                if (label === "Login") return null;
                return (
                  <Link
                    href={href}
                    onClick={() => {
                      setOpen(false);
                    }}
                    className={`rounded-md flex gap-x-2 items-center  cursor-pointer ${
                      active ? "bg-secondary" : ""
                    } hover:bg-secondary p-3 transition-all`}
                    key={label}
                  >
                    <Icon />
                    <p>{label}</p>
                  </Link>
                );
              })}
              <div
                onClick={handleClick}
                className={`rounded-md gap-x-2 items-center  cursor-pointer hover:bg-secondary p-3 transition-all`}
              >
                <ModeToggle />
              </div>
              <div
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className={`rounded-md ${
                  isAuth ? "flex" : "hidden"
                } gap-x-2 items-center  cursor-pointer hover:bg-secondary p-3 transition-all`}
              >
                <FaSignInAlt />
                <p>Logout</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
