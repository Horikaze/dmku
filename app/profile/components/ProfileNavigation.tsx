import Link from "next/link";
import {
  FaGamepad,
  FaGear,
  FaPlus,
  FaTableCells,
  FaUser,
} from "react-icons/fa6";

const tabs = [
  {
    label: "Profile",
    icon: FaUser,
  },
  {
    label: "Add",
    icon: FaPlus,
  },
  {
    label: "Replays",
    icon: FaGamepad,
  },
  {
    label: "Table",
    icon: FaTableCells,
  },
  {
    label: "Settings",
    icon: FaGear,
  },
];

export default async function ProfileNavigation() {
  return (
    <div className="flex w-full flex-col p-3">
      <div className="flex flex-row justify-around border">
        {tabs.map(({ icon: Icon, label }) => {
          if (label === "Profile") {
            return (
              <Link
                href={`/profile`}
                key={label}
                className="py-3 px-2 flex flex-row gap-x-1 items-center md:px-10 cursor-pointer hover:bg-secondary rounded"
              >
                <Icon />
                <p>{label}</p>
              </Link>
            );
          }
          return (
            <Link
              href={`/profile/${label.toLocaleLowerCase()}`}
              key={label}
              className="py-3 px-2 flex flex-row gap-x-1 items-center md:px-10 cursor-pointer hover:bg-secondary rounded"
            >
              <Icon />
              <p>{label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
