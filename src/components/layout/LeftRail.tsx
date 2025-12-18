import { Home, Layers, Settings, Users, Activity } from 'lucide-react';

export function LeftRail() {
  return (
    <div className="w-16 border-r bg-muted/20 flex flex-col items-center py-4 gap-6 h-full">
      <div className="p-2 bg-primary text-primary-foreground rounded-lg">
        <Layers className="size-6" />
      </div>
      
      <nav className="flex flex-col gap-4 mt-4 text-muted-foreground">
        <button className="p-2 hover:bg-muted rounded-md hover:text-foreground transition-colors">
          <Home className="size-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-md hover:text-foreground transition-colors">
          <Users className="size-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-md hover:text-foreground transition-colors">
          <Activity className="size-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-md hover:text-foreground transition-colors">
          <Settings className="size-5" />
        </button>
      </nav>
    </div>
  );
}
