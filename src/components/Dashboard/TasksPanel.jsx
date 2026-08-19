import React, { useState } from "react";

// Status color mapping (backend enum values के साथ match)
const statusColors = {
  PENDING: "bg-qx-primary text-qx-primary",
  COMPLETED: "bg-green-100 text-green-800",
  SUBMITTED: "bg-red-100 text-red-800",
};

// Priority color mapping
const priorityColors = {
  Low: "bg-blue-100 text-blue-800",
  Medium: "bg-orange-100 text-orange-800",
  High: "bg-red-100 text-red-800",
};

export default function TasksPanel({ tasks = [], internId, setTasks }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loadingTaskId, setLoadingTaskId] = useState(null);

  // Filter + search
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed" && t.status !== "COMPLETED") return false;
    if (filter === "pending" && t.status !== "PENDING") return false;
    if (
      search &&
      !t.title.toLowerCase().includes(search.toLowerCase()) &&
      !t.description.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "COMPLETED").length;
  const pendingTasks = totalTasks - completedTasks;

  // ✅ Submit API call
  const handleSubmit = async (taskId) => {
    try {
      setLoadingTaskId(taskId);
      const response = await fetch(
        `http://localhost:8083/task/intern/submit?taskId=${taskId}&internId=${internId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unknown error");
      }

      const data = await response.json();
      console.log("Task submitted:", data);

      // Update local state: mark task as Completed
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, status: "COMPLETED" } : t
        )
      );

      alert("Task submitted successfully!");
    } catch (err) {
      console.error("Error submitting task:", err);
      alert("Task submission failed: " + err.message);
    } finally {
      setLoadingTaskId(null);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header + Stats */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
        <h3 className="font-semibold text-lg">Tasks</h3>
        <div className="flex gap-4 text-sm text-gray-600">
          <div>Total: {totalTasks}</div>
          <div className="text-green-700">Completed: {completedTasks}</div>
          <div className="text-qx-primary">Pending: {pendingTasks}</div>
        </div>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="border rounded px-2 py-1 text-sm w-full md:w-64"
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {filteredTasks.length === 0 && (
          <div className="text-sm text-qx-textMuted">No tasks found</div>
        )}

        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-start bg-white border-l-4 p-4 rounded shadow-sm hover:shadow-md transition-shadow ${
              task.status === "COMPLETED"
                ? "border-green-500"
                : task.status === "PENDING"
                ? "border-qx-borderHover"
                : "border-red-500"
            }`}
          >
            <div>
              <h4 className="font-semibold text-gray-800">{task.title}</h4>
              <p className="text-gray-600 mt-1">{task.description}</p>
              <div className="flex space-x-2 mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    statusColors[task.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {task.status}
                </span>
                {task.priority && (
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      priorityColors[task.priority] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                )}
              </div>
              {task.dueDate && (
                <div className="text-xs text-qx-textMuted mt-1">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Right actions */}
            {task.status !== "COMPLETED" && (
              <div className="flex flex-col items-end space-y-2">
                <button
                  onClick={() => handleSubmit(task.id)}
                  disabled={loadingTaskId === task.id}
                  className={`px-3 py-1 rounded text-white transition ${
                    loadingTaskId === task.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {loadingTaskId === task.id ? "Submitting..." : "Submit"}
                </button>
                <a
                  href={`/tasks/${task.id}`}
                  className="text-xs text-blue-600 hover:underline"
                >
                  View
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
