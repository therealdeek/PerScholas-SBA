import { useState } from "react";
import type { Task, Priority } from "../../types/index";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState<string>("");
  const [errors, setErrors] = useState<Partial<Record<keyof Task, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Task, string>> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      status: "to-do",
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Add New Task
      </h2>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="title"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
          placeholder="Task title"
        />
        {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
          placeholder="Optional description"
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="priority"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="dueDate"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Due Date <span className="text-red-500">*</span>
        </label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
        />
        {errors.dueDate && (
          <p className="text-red-500 text-xs">{errors.dueDate}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
