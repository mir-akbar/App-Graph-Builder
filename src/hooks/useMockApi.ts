import { useQuery } from '@tanstack/react-query';
import type { Edge, Node } from '@xyflow/react';

// Types
export interface App {
    id: string;
    name: string;
    description: string;
}

export interface NodeData extends Record<string, unknown> {
    label: string;
    status: 'healthy' | 'degraded' | 'down';
    replicas: number;
    cpu: number;
    memory: number;
    disk: number;
    region: string;
    vendor: 'aws' | 'gcp' | 'azure';
    description?: string;
}

// Mock Data
const MOCK_APPS: App[] = [
    { id: 'app-ecommerce', name: 'E-commerce Core', description: 'Main shopping platform backend' },
    { id: 'app-analytics', name: 'Analytics Pipeline', description: 'Data processing and events' },
    { id: 'app-auth', name: 'Auth Service', description: 'User authentication and identity' },
];

const MOCK_NODES_TEMPLATE: Node<NodeData>[] = [
    {
        id: 'node-1',
        position: { x: 100, y: 100 },
        data: {
            label: 'API Gateway',
            status: 'healthy',
            replicas: 3,
            description: 'Entry point for all traffic',
            cpu: 0.5,
            memory: 1,
            disk: 20,
            region: 'us-east-1',
            vendor: 'aws'
        },
        type: 'service',
    },
    {
        id: 'node-2',
        position: { x: 500, y: 300 },
        data: {
            label: 'Auth Service',
            status: 'degraded',
            replicas: 2,
            description: 'Handles tokens and sessions',
            cpu: 0.2,
            memory: 0.5,
            disk: 10,
            region: 'us-west-2',
            vendor: 'aws'
        },
        type: 'service',
    },
    {
        id: 'node-3',
        position: { x: 900, y: 100 },
        data: {
            label: 'Database',
            status: 'healthy',
            replicas: 1,
            description: 'Primary PostgreSQL cluster',
            cpu: 2,
            memory: 8,
            disk: 100,
            region: 'eu-central-1',
            vendor: 'aws'
        },
        type: 'service',
    },
];

const MOCK_EDGES: Edge[] = [
    { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true },
    { id: 'e2-3', source: 'node-2', target: 'node-3', animated: true },
];

// Simulated Delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useApps = () => {
    return useQuery({
        queryKey: ['apps'],
        queryFn: async () => {
            await delay(800); // Simulate latency
            return MOCK_APPS;
        },
    });
};

export const useAppGraph = (appId: string | null) => {
    return useQuery({
        queryKey: ['graph', appId],
        queryFn: async () => {
            if (!appId) return { nodes: [], edges: [] };
            await delay(600);

            // Generate slightly different data per app to prove it changes
            // In a real app this would be actual DB data
            const nodes = MOCK_NODES_TEMPLATE.map(n => ({
                ...n,
                id: `${appId}-${n.id}`, // specific IDs so react flow treats them as new or we can just keep generic
                data: {
                    ...n.data,
                    label: `${n.data.label} (${appId?.split('-')[1]})`
                }
            }));

            const edges = MOCK_EDGES.map(e => ({
                ...e,
                id: `${appId}-${e.id}`,
                source: `${appId}-${e.source}`,
                target: `${appId}-${e.target}`
            }));

            return { nodes, edges };
        },
        enabled: !!appId,
        staleTime: 0, // Always refetch for demo purposes
    });
};
