import { useReactFlow, useNodes } from '@xyflow/react';
import { useAppStore } from '@/store/useAppStore';
import type { NodeData } from '@/hooks/useMockApi';
import { ArrowLeft } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const STATUS_COLORS = {
  healthy: "bg-green-500 hover:bg-green-600",
  degraded: "bg-yellow-500 hover:bg-yellow-600",
  down: "bg-red-500 hover:bg-red-600",
  unknown: "bg-gray-500 hover:bg-gray-600",
};

export function InspectorPanel() {
  const { selectedNodeId, activeInspectorTab, setInspectorTab, selectNode } = useAppStore();
  const { setNodes } = useReactFlow();
  const nodes = useNodes();
  
  const node = selectedNodeId ? nodes.find(n => n.id === selectedNodeId) : null;
  const data = node?.data as NodeData | undefined;

  if (!node || !data) {
    return (
      <div className="h-full p-4 flex flex-col items-center justify-center text-center text-muted-foreground">
        Select a node to inspect properties.
      </div>
    );
  }

  const updateNode = (key: string, value: string | number) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === selectedNodeId) {
          return { ...n, data: { ...n.data, [key]: value } };
        }
        return n;
      })
    );
  };

  const statusColor = STATUS_COLORS[data.status as keyof typeof STATUS_COLORS] || STATUS_COLORS.unknown;

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2" onClick={() => selectNode(null)}>
                <ArrowLeft className="size-4" />
            </Button>
            <div>
            <h2 className="font-semibold text-lg leading-none">Inspector</h2>
            <p className="text-xs text-muted-foreground font-mono mt-1">{node.id}</p>
            </div>
        </div>
        <Badge className={`${statusColor} capitalize`}>
          {data.status}
        </Badge>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeInspectorTab} onValueChange={setInspectorTab} className="w-full h-full flex flex-col">
          <div className="px-4 pt-4">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="config">Config</TabsTrigger>
              <TabsTrigger value="runtime">Runtime</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="config" className="flex-1 overflow-auto p-4 space-y-6">
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Service Name</Label>
                <Input 
                  id="name" 
                  value={data.label} 
                  onChange={(e) => updateNode('label', e.target.value)} 
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  value={data.description || ''} 
                  onChange={(e) => updateNode('description', e.target.value)}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Replicas</Label>
                  <span className="text-sm font-medium text-muted-foreground">{data.replicas}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[data.replicas]} 
                    min={0} 
                    max={100} 
                    step={1} 
                    onValueChange={(vals) => updateNode('replicas', vals[0])}
                    className="flex-1"
                  />
                  <Input 
                    type="number" 
                    value={data.replicas} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      updateNode('replicas', val);
                    }}
                    className="w-20"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Adjust the number of service replicas/pods.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="runtime" className="flex-1 overflow-auto p-4">
            <Card>
              <CardHeader>
                <CardTitle>Metrics</CardTitle>
                <CardDescription>Real-time runtime statistics.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="font-mono">99.9%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CPU Usage</span>
                  <span className="font-mono">45%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Memory</span>
                  <span className="font-mono">1.2GB</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
