
import { memo, useState } from 'react';
import { Handle, Position, useReactFlow, type NodeProps, useNodes } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Settings, Database, Cloud, Globe, Cpu, HardDrive, MemoryStick } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NodeData } from '@/hooks/useMockApi';

const STATUS_COLORS = {
  healthy: "bg-green-500/20 text-green-500 hover:bg-green-500/30",
  degraded: "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30",
  down: "bg-red-500/20 text-red-500 hover:bg-red-500/30",
};

export const ServiceNode = memo(({ id, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();
  // Subscribe to node updates
  const nodes = useNodes();
  const node = nodes.find((n) => n.id === id);
  const data = node?.data as NodeData;

  const [activeTab, setActiveTab] = useState<'cpu' | 'memory' | 'disk'>('cpu');

  if (!data) return null;

  const updateResource = (key: 'cpu' | 'memory' | 'disk', value: number) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === id) {
          return { ...n, data: { ...n.data, [key]: value } };
        }
        return n;
      })
    );
  };

  const statusColor = STATUS_COLORS[data.status] || "bg-gray-500/20 text-gray-500";
  const isAWS = data.vendor === 'aws';

  const currentValue = data[activeTab];
  
  // Define max values for slider ranges
  const limits = { cpu: 8, memory: 16, disk: 500 }; 
  const units = { cpu: 'Cores', memory: 'GB', disk: 'GB' };
  const icons = { cpu: Cpu, memory: MemoryStick, disk: HardDrive };
  const ActiveIcon = icons[activeTab];

  return (
    <Card className={cn(
        "w-[350px] shadow-lg transition-all duration-200 border-2",
        selected ? "border-primary ring-2 ring-primary/20" : "border-border"
      )}>
      {/* Handles */}
      <Handle type="target" position={Position.Top} className="!bg-primary !w-3 !h-3" />
      <Handle type="source" position={Position.Bottom} className="!bg-primary !w-3 !h-3" />

      <CardHeader className="p-4 pb-2 space-y-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-md">
              <Database className="size-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold">{data.label}</CardTitle>
              <div className="flex items-center gap-1.5 mt-0.5">
                 <Badge variant="outline" className={cn("text-[10px] h-5 px-1.5 border-0 font-medium", statusColor)}>
                    {data.status.toUpperCase()}
                 </Badge>
                 <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-0.5">
                   <Globe className="size-3" /> {data.region}
                 </span>
              </div>
            </div>
          </div>
          <Settings className="size-4 text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-4">
        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y bg-muted/30 -mx-4 px-4">
            <div className="flex flex-col items-center">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">CPU</span>
                <span className="text-xs font-mono font-medium">{data.cpu} C</span>
            </div>
            <div className="flex flex-col items-center border-l border-border/50">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">RAM</span>
                <span className="text-xs font-mono font-medium">{data.memory} GB</span>
            </div>
            <div className="flex flex-col items-center border-l border-border/50">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Disk</span>
                <span className="text-xs font-mono font-medium">{data.disk} GB</span>
            </div>
        </div>

        {/* Controls */}
        <div className="space-y-3">
             <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                <TabsList className="w-full h-8 grid grid-cols-3">
                    <TabsTrigger value="cpu" className="text-xs h-6">CPU</TabsTrigger>
                    <TabsTrigger value="memory" className="text-xs h-6">Memory</TabsTrigger>
                    <TabsTrigger value="disk" className="text-xs h-6">Disk</TabsTrigger>
                </TabsList>
             </Tabs>
             
             <div className="flex items-center gap-3 pt-1">
                <div className="p-1.5 bg-muted rounded-md text-muted-foreground">
                    <ActiveIcon className="size-4" />
                </div>
                <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-xs">
                        <span className="font-medium text-muted-foreground">{activeTab.toUpperCase()}</span>
                        <span className="font-mono">{currentValue} {units[activeTab]}</span>
                    </div>
                    <Slider 
                        value={[currentValue]} 
                        max={limits[activeTab]} 
                        step={activeTab === 'cpu' ? 0.1 : 1}
                        onValueChange={(vals) => updateResource(activeTab, vals[0])}
                        className="py-1"
                    />
                </div>
             </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end pt-2">
            {isAWS && (
                 <div className="text-[#FF9900] font-bold text-xs flex items-center gap-1">
                    <Cloud className="size-3 fill-current" /> AWS
                 </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
});

ServiceNode.displayName = "ServiceNode";
