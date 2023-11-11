"use client";
import { useState } from "react";
import {
  FaGamepad,
  FaGear,
  FaPlus,
  FaTableCells,
  FaUser,
} from "react-icons/fa6";
import AddReplay from "./components/profileComponents/AddReplay";
import { ProfileInfo } from "./components/profileComponents/ProfileInfo";
import Replays from "./components/profileComponents/Replays";
import { Settings } from "./components/profileComponents/Settings";
import Table from "./components/profileComponents/Table";

type tabsType = "Profile" | "Table" | "Replays" | "Settings" | "Add";

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

const getTabComponent = (tabOpen: tabsType) => {
  switch (tabOpen) {
    case "Settings":
      return <Settings />;
    case "Profile":
      return <ProfileInfo />;
    case "Replays":
      return <Replays />;
    case "Add":
      return <AddReplay />;
    case "Table":
      return <Table />;
    default:
      return <ProfileInfo />;
  }
};

export default function ProfileContent() {
  const [tabOpen, setTabOpen] = useState<tabsType>("Profile");
  return (
    <div className="flex w-full flex-col p-3">
      <div className="flex flex-row justify-around border">
        {tabs.map(({ icon: Icon, label }) => (
          <button
            onClick={() => {
              setTabOpen(label as tabsType);
            }}
            key={label}
            className="py-3 px-2 flex flex-row gap-x-1 items-center md:px-10 cursor-pointer hover:bg-secondary rounded"
          >
            <Icon />
            <p>{label}</p>
          </button>
        ))}
      </div>
      <div className="flex justify-center p-3">{getTabComponent(tabOpen)}</div>
    </div>
  );
}
