import DesktopSidebar from "./DesktopNav";

const Navigation =  ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex flex-col h-full gap-y-2">
      <DesktopSidebar />
      <main className="h-full w-full px-2 md:px-4 lg:px-24 xl:px-36 2xl:px-80">
        {children}
      </main>
    </div>
  );
};

export default Navigation;
