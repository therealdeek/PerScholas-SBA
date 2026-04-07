import { useState } from "react";
import type { Task, Status } from "../../types/index";
import TaskItem from "./TaskItem";
import TaskForm from "../TaskForm/TaskForm";
import { sortTasks } from "../../utils/taskUtils";

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
  onAddTask: (task: Task) => void;
}

type SortField = "dueDate" | "priority" | "createdAt";
type SortDirection = "asc" | "desc";

const TaskList = ({
  tasks,
  onStatusChange,
  onDelete,
  onAddTask,
}: TaskListProps) => {
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [search, setSearch] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  // Sort using utility function
  const sortedTasks = sortTasks(tasks, sortField, sortDirection);

  // Then apply local search on top of sorted results
  const visibleTasks =
    search.trim() === ""
      ? sortedTasks
      : sortedTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase()),
        );

  const toggleDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleAddAndClose = (task: Task) => {
    onAddTask(task);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* List Header — Search + Add Button */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks by title or description..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white min-w-[180px]"
        />
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shrink-0"
        >
          {showForm ? "✕ Cancel" : "+ Add Task"}
        </button>
      </div>

      {/* Inline Task Form (conditionally rendered) */}
      {showForm && <TaskForm onAddTask={handleAddAndClose} />}

      {/* Sort Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Sort by:
        </span>
        {(["createdAt", "dueDate", "priority"] as SortField[]).map((field) => (
          <button
            key={field}
            onClick={() => setSortField(field)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              sortField === field
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-600 dark:text-gray-300 border-gray-300 hover:border-blue-400"
            }`}
          >
            {field === "createdAt"
              ? "Date Created"
              : field === "dueDate"
                ? "Due Date"
                : "Priority"}
          </button>
        ))}
        <button
          onClick={toggleDirection}
          className="text-xs px-3 py-1 rounded-full border border-gray-300 text-gray-600 dark:text-gray-300 hover:border-blue-400 transition-colors"
        >
          {sortDirection === "asc" ? "↑ Asc" : "↓ Desc"}
        </button>
      </div>

      {/* Task Count */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {visibleTasks.length} {visibleTasks.length === 1 ? "task" : "tasks"}{" "}
        found
      </p>

      {/* Task Items or Empty State */}
      {visibleTasks.length === 0 ? (
        <div className="text-center py-10 text-gray-400 dark:text-gray-500">
          <p className="text-lg">No tasks found</p>
          <p className="text-sm mt-1">
            {search.trim() !== ""
              ? "Try a different search term."
              : "Add a task or adjust your filters."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
