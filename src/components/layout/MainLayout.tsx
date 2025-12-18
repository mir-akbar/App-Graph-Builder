import type { ReactNode } from 'react';
import { LeftRail } from './LeftRail';
import { TopBar } from './TopBar';
import { SidePanel } from './SidePanel';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      {/* Left Rail - Fixed */}
      <LeftRail />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar - Fixed height */}
        <TopBar />

        {/* Main Workspace Area */}
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* Canvas Area */}
          <main className="flex-1 relative bg-neutral-50 dark:bg-neutral-900 border-r-0 md:border-r">
            {children}
          </main>

          {/* Right Panel - Responsive: Sidebar on Desktop, Drawer on Mobile */}
          <SidePanel />
        </div>
      </div>
    </div>
  );
}
