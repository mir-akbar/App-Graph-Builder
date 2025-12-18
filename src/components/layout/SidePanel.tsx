import { useAppStore } from '@/store/useAppStore';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { AppList } from './AppList';
import { InspectorPanel } from '@/components/inspector/InspectorPanel';

function PanelContent() {
  const { selectedNodeId } = useAppStore();
  // Show Inspector if a node is selected, otherwise App List
  return selectedNodeId ? <InspectorPanel /> : <AppList />;
}

export function SidePanel() {
  const { isMobilePanelOpen, toggleMobilePanel } = useAppStore();

  return (
    <>
      {/* Desktop Sidebar: Visible on md+ */}
      <aside className="hidden md:flex w-[350px] border-l bg-background flex-col h-full overflow-y-auto">
        <PanelContent />
      </aside>

      {/* Mobile Drawer: Controlled by Store */}
      <Sheet open={isMobilePanelOpen} onOpenChange={toggleMobilePanel}>
        <SheetContent side="right" className="w-[85vw] sm:w-[400px] p-0">
          <div className='sr-only'>
            <SheetTitle>Inspector</SheetTitle>
          </div>
          <div className="h-full overflow-y-auto pt-4">
             <PanelContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
