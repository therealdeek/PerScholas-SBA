# Task Management Dashboard

A responsive task management app built with React, TypeScript, and Tailwind CSS. I built this as part of my Per Scholas SBA to practice component architecture, state management, and TypeScript typing in a real project.

---

## What It Does

- Add, delete, and update tasks
- Filter tasks by status, priority, and a search term
- Sort tasks by date created, due date, or priority
- Stats bar showing a live count of tasks by status
- Dark mode toggle that persists across the session
- Tasks saved to localStorage so nothing is lost on refresh

---

## Tech Stack

- **React 19** — component architecture, hooks
- **TypeScript** — strict typing throughout
- **Tailwind CSS v4** — utility-first styling with class-based dark mode
- **Vite** — development server and build tool

---

## Getting Started

### Prerequisites

Make sure you have Node.js installed. You can check by running:

```bash
node -v
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/task-dashboard.git
cd task-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and go to `http://localhost:5173`

---

## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   └── Dashboard.tsx       # Root component — owns all state
│   ├── TaskFilter/
│   │   └── TaskFilter.tsx      # Filter controls for status, priority, search
│   ├── TaskForm/
│   │   └── TaskForm.tsx        # Controlled form for adding new tasks
│   └── TaskList/
│       ├── TaskList.tsx        # Renders the task list with sort and search
│       └── TaskItem.tsx        # Individual task card with status and delete
├── types/
│   └── index.ts                # Shared TypeScript types and interfaces
├── utils/
│   └── taskUtils.ts            # Reusable utility functions
├── App.tsx
├── main.tsx
└── index.css
```

---

## Component Overview

### `Dashboard`
The top-level component. Owns all task and filter state, wires up localStorage persistence, and composes all other components together. Dark mode is also controlled here.

### `TaskForm`
A fully controlled form component. Handles its own local input state and validation before passing a completed task up to `Dashboard` via the `onAddTask` callback.

### `TaskFilter`
Renders filter controls for status, priority, and a text search. Displays active filter indicators so the user always knows what's being applied. State is lifted up to `Dashboard`.

### `TaskList`
Receives the already-filtered task list from `Dashboard`, then applies its own local sort and search on top. Also handles inline task addition via a toggleable `TaskForm`.

### `TaskItem`
Renders a single task card. Shows title, description, priority badge, due date, and a status dropdown. Calls back up to `Dashboard` for status changes and deletions.

### `taskUtils.ts`
Holds three reusable functions — `filterTasks`, `sortTasks`, and `formatDate` — and one validation helper `validateTitle`. Keeping logic here instead of inside components makes each function independently testable.

---

## Key Technical Decisions

**Why is all state in `Dashboard`?**
React's data flow is one-directional — state lives in the closest common ancestor of all components that need it. Since `TaskList`, `TaskFilter`, and the stats bar all need access to the task list, `Dashboard` is the right place.

**Why does `TaskList` have its own local search and sort?**
The global filter in `TaskFilter` is for broad filtering — by status and priority. The local search and sort in `TaskList` are display-level concerns that no other component needs to know about. Keeping them local avoids unnecessary re-renders in sibling components.

**Why a lazy initializer for localStorage?**
Calling `setState` inside a `useEffect` to load from localStorage causes a cascading render — the component renders once with empty state, then immediately re-renders with the loaded data. A lazy initializer passed directly to `useState` runs once synchronously before the first render, which is cleaner and avoids the double render entirely.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |