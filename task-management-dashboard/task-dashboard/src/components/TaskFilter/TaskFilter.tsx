import type { FilterOptions } from "../../types/index";

interface TaskFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const TaskFilter = ({ filters, onFilterChange }: TaskFilterProps) => {
  const handleChange = (field: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.search.trim() !== "";

  const handleReset = () => {
    onFilterChange({ status: "all", priority: "all", search: "" });
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-xs text-blue-500 hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Search */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="search"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Search
        </label>
        <input
          id="search"
          type="text"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          placeholder="Search tasks..."
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Status Filter */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="status"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Status
        </label>
        <select
          id="status"
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All</option>
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Priority Filter */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="priority"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Priority
        </label>
        <select
          id="priority"
          value={filters.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Active Filter Indicators */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-1">
          {filters.status !== "all" && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
              Status: {filters.status}
            </span>
          )}
          {filters.priority !== "all" && (
            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
              Priority: {filters.priority}
            </span>
          )}
          {filters.search.trim() !== "" && (
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
              Search: "{filters.search}"
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskFilter;
