import DesktopSidebar from "./desktopSidebar/DesktopNav";
import MobileFooter from "./mobileFooter/MobileFooter";

const Navigation = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <DesktopSidebar />
      <main className="h-full w-full px-2 md:px-4 lg:px-32 xl:px-48 2xl:px-64 pb-20 pt-5">
        {children}
      </main>
      <MobileFooter />
    </div>
  );
};

export default Navigation;
