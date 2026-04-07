import type { Task, FilterOptions, Priority } from "../types/index";

// Filter tasks based on FilterOptions
export const filterTasks = (tasks: Task[], filters: FilterOptions): Task[] => {
  return tasks.filter((task) => {
    const matchesStatus =
      filters.status === "all" || task.status === filters.status;

    const matchesPriority =
      filters.priority === "all" || task.priority === filters.priority;

    const matchesSearch =
      filters.search.trim() === "" ||
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });
};

// Sort tasks
const priorityOrder: Record<Priority, number> = {
  high: 1,
  medium: 2,
  low: 3,
};

export const sortTasks = (
  tasks: Task[],
  field: "dueDate" | "priority" | "createdAt",
  direction: "asc" | "desc",
): Task[] => {
  return [...tasks].sort((a, b) => {
    let comparison = 0;

    if (field === "priority") {
      comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
      // Tiebreaker — same priority? sort by dueDate
      if (comparison === 0) {
        comparison =
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
    } else if (field === "dueDate") {
      comparison =
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (field === "createdAt") {
      comparison =
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    return direction === "asc" ? comparison : -comparison;
  });
};

// Format a date string to a readable format
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Validate a task title
export const validateTitle = (title: string): string | null => {
  if (!title.trim()) return "Title is required.";
  if (title.trim().length < 3) return "Title must be at least 3 characters.";
  return null;
};
