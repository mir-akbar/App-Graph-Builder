import { Bell, Search, PanelRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';

export function TopBar() {
  const { toggleMobilePanel, isMobilePanelOpen } = useAppStore();

  return (
    <header className="h-14 border-b px-4 flex items-center justify-between bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex items-center gap-2">
        <h1 className="font-semibold text-lg">Graph Builder</h1>
        <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">Beta</span>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground md:hidden"
          onClick={() => toggleMobilePanel(!isMobilePanelOpen)}
        >
          <PanelRight className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Search className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="size-5" />
        </Button>
        <div className="size-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 ml-2" />
      </div>
    </header>
  );
}
