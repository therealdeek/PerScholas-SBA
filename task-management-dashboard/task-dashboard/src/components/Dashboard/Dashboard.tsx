import { useState, useEffect } from "react";
import type { Task, FilterOptions, Status } from "../../types/index";
import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskList from "../TaskList/TaskList";
import { filterTasks } from "../../utils/taskUtils";

const Dashboard = () => {
  // Lazy initializer — runs ONCE on mount, never again
  // Per React docs: pass a function to useState to initialize from an external source
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem("tasks");
      return stored ? (JSON.parse(stored) as Task[]) : [];
    } catch {
      console.error("Failed to parse tasks from localStorage");
      return [];
    }
  });

  const [filters, setFilters] = useState<FilterOptions>({
    status: "all",
    priority: "all",
    search: "",
  });
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Save to localStorage whenever tasks changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Toggle dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleAddTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleStatusChange = (id: string, status: Status) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const filteredTasks = filterTasks(tasks, filters);

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "to-do").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          📋 Task Dashboard
        </h1>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="text-sm px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total", value: stats.total, color: "blue" },
            { label: "To Do", value: stats.todo, color: "gray" },
            { label: "In Progress", value: stats.inProgress, color: "yellow" },
            { label: "Done", value: stats.done, color: "green" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center border-t-4 border-${color}-400`}
            >
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-6">
            <TaskForm onAddTask={handleAddTask} />
            <TaskFilter filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className="lg:col-span-2">
            <TaskList
              tasks={filteredTasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTask}
              onAddTask={handleAddTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
