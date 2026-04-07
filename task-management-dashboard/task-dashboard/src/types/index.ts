// Our "Priority" status can only ever be one of these three strings
export type Priority = "low" | "medium" | "high";

// Our "Status" will either one of these three options
export type Status = "to-do" | "in-progress" | "done";

// Every task in our app must match this interface.
export interface Task {
  id: string; // Unique identifier for each task
  title: string; // The name of the task
  description: string; // More detail about the task
  priority: Priority; // Must be 'low', 'medium', or 'high'
  status: Status; // Must be 'pending' or 'completed'
  createdAt: string; // ISO date string of when it was created
  dueDate: string; // ISO date string of when it's due
}

// This describes the shape of data inside the TaskForm
// before it becomes a full Task (no id or createdAt yet)
export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

// This describes the filter options a user can apply to the task list
export interface FilterOptions {
  status: Status | "all"; // Filter by status, or show all
  priority: Priority | "all"; // Filter by priority, or show all
  search: string; // Text search across task titles
}
