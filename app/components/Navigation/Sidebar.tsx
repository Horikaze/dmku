import DesktopSidebar from "./components/navigation/desktopSidebar/DesktopSidebar";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row h-full">
      <DesktopSidebar />
      <main className="h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
