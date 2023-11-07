import DesktopSidebar from "./desktopSidebar/DesktopNav";
import MobileFooter from "./mobileFooter/MobileFooter";

const Navigation = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <DesktopSidebar />
      <main className="h-full w-full">{children}</main>
      <MobileFooter />
    </div>
  );
};

export default Navigation;
