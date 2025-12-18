import { useAppStore } from '@/store/useAppStore';
import { useApps } from '@/hooks/useMockApi';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function AppList() {
  const { data: apps, isLoading } = useApps();
  const { selectedAppId, selectApp } = useAppStore();

  if (isLoading) {
    return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="flex flex-col gap-3 p-4">
      <h2 className="text-lg font-semibold mb-2">Applications</h2>
      {apps?.map((app) => (
        <Card 
          key={app.id} 
          className={`cursor-pointer transition-all hover:bg-muted/50 ${selectedAppId === app.id ? 'border-primary bg-muted/30' : ''}`}
          onClick={() => selectApp(app.id)}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-base">{app.name}</CardTitle>
            <CardDescription className="text-xs">{app.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
      
      {!apps && <div className="text-sm text-muted-foreground p-4">No apps found.</div>}
    </div>
  );
}
