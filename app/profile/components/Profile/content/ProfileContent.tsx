"use client";
import { useState } from "react";
import { FaGamepad, FaTableCells, FaUser } from "react-icons/fa6";
import { Settings } from "./components/profileComponents/Settings";

type tabsType = "Profile" | "Table" | "Replays" | "Settings";

const tabs = [
  {
    label: "Profile",
    icon: FaUser,
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
    href: "/profile/settings",
    icon: FaTableCells,
  },
];

export default function ProfileContent() {
  const [tabOpen, setTabOpen] = useState<tabsType>("Profile");
  return (
    <div className="flex w-full flex-col p-3">
      <div className="flex flex-row justify-around border">
        {tabs.map((tab) => (
          <button
            onClick={() => {
              setTabOpen(tab.label as tabsType);
            }}
            key={tab.label}
            className="py-3 px-5 md:px-10 cursor-pointer hover:bg-secondary rounded"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex justify-center p-3">
        {tabOpen === "Settings" ? <Settings /> : null}
      </div>
    </div>
  );
}
