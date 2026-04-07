import type { Task, Status } from "../../types/index";

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

const priorityStyles: Record<string, string> = {
  low: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

const TaskItem = ({ task, onStatusChange, onDelete }: TaskItemProps) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value as Status);
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-shadow">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2">
        <h3
          className={`font-semibold text-gray-800 dark:text-white text-sm ${task.status === "done" ? "line-through opacity-50" : ""}`}
        >
          {task.title}
        </h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors text-xs shrink-0"
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {task.description}
        </p>
      )}

      {/* Footer Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 mt-1">
        {/* Priority Badge */}
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityStyles[task.priority]}`}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>

        {/* Due Date */}
        <span className="text-xs text-gray-400 dark:text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>

        {/* Status Dropdown */}
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="text-xs border rounded-lg px-2 py-1 dark:bg-gray-700 dark:text-white"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default TaskItem;
