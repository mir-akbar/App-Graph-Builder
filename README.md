# App Graph Builder

A responsive web application for visualizing and managing service architectures using interactive graphs. Built with React, ReactFlow, and Shadcn UI.

## Features

- **Interactive Graph Visualization**: Visualize service nodes and dependencies using ReactFlow.
- **Node Inspection**: Click any node to view and edit its properties (Service Name, Replicas).
- **Real-time Sync**: Two-way data binding between the inspector controls (Slider, Input) and the graph nodes.
- **Mock Data Layer**: Simulates real-world API latency and data fetching with TanStack Query.
- **Responsive Design**: The right panel adapts from a sidebar (Desktop) to a slide-over drawer (Mobile).

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd graph-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5173`.

### Build & Check

- **Type Check**: `npm run typecheck`
- **Lint**: `npm run lint`
- **Build**: `npm run build`

## Key Engineering Decisions

- **State Management (Zustand)**: Used for global UI state (selected App, selected Node, UI toggles) to avoid prop drilling and keep components clean.
- **Data Fetching (TanStack Query)**: chosen for its robust caching and loading state management, simulating a real production environment where graph data comes from an async API.
- **Component Library (Shadcn UI)**: Accelerates development with accessible, high-quality unstyled components that are easily customizable via Tailwind CSS.
- **Strict TypeScript**: The project is configured with `strict: true` to ensure type safety and reduce runtime errors.

## Known Limitations

- **Persistence**: Changes made to nodes (like name or replicas) are currently local to the session and do not persist to a backend database (as the API is mocked).
- **Edge Editing**: Users cannot currently add or remove edges via the UI; the graph structure is read-only except for node deletions.
- **Layout**: Automatic layout (dagre/elk) is not implemented; nodes use hardcoded positions similar to the mock.

## Technologies

- [React 19](https://react.dev/)
- [React Flow (xyflow)](https://reactflow.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
