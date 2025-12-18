import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  addEdge,
  type Connection,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useAppStore } from '@/store/useAppStore';
import { useAppGraph } from '@/hooks/useMockApi';
import { Loader2 } from 'lucide-react';

export function GraphCanvas() {
  const { selectedAppId, selectNode, selectedNodeId } = useAppStore();
  const { data, isLoading } = useAppGraph(selectedAppId);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Sync Query Data to Local State when App Changes
  useEffect(() => {
    if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
      selectNode(null); // Deselect on app change
    }
  }, [data, setNodes, setEdges, selectNode]);

  // Handle Selection Sync (Local interaction updates global store)
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    selectNode(node.id);
  }, [selectNode]);

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  // Handle Edges connection (optional, just for completeness)
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full text-muted-foreground gap-2">
        <Loader2 className="animate-spin" />
        Loading Graph...
      </div>
    );
  }

  if (!selectedAppId) {
    return (
      <div className="flex items-center justify-center h-full w-full text-muted-foreground">
        Select an app from the right panel to view its graph.
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes.map(n => ({ ...n, selected: n.id === selectedNodeId }))} // Force selection style from store
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
