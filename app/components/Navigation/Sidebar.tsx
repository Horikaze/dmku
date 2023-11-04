import DesktopSidebar from "./desktopSidebar/DesktopSidebar";
import MobileFooter from "./mobileFooter/MobileFooter";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <DesktopSidebar />
      <main className="h-full">{children}</main>
      <MobileFooter />
    </div>
  );
};

export default Sidebar;
