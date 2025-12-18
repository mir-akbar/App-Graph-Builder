import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactFlowProvider } from '@xyflow/react';
import { MainLayout } from '@/components/layout/MainLayout';
import { GraphCanvas } from '@/components/graph/GraphCanvas';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactFlowProvider>
        <MainLayout>
          <GraphCanvas />
        </MainLayout>
      </ReactFlowProvider>
    </QueryClientProvider>
  );
}

export default App;
