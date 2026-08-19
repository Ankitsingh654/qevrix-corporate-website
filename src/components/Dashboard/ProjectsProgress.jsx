// src/components/dashboard/TasksPanel.jsx
import React, { useState } from "react";

export default function TasksPanel({ tasks = [] }) {
  const [filter, setFilter] = useState("all");

  const filtered = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Tasks</h3>
        <div className="flex items-center gap-2 text-sm">
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
      </div>

      <div className="mt-4 space-y-3 max-h-[420px] overflow-auto">
        {filtered.length === 0 && <div className="text-sm text-qx-textMuted">No tasks</div>}
        {filtered.map((t) => (
          <div key={t.id} className={`p-3 border rounded flex justify-between items-start ${t.completed ? "bg-green-50" : ""}`}>
            <div>
              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-gray-500">{t.description}</div>
              <div className="text-xs text-qx-textMuted mt-2">Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}</div>
            </div>

            <div className="text-right space-y-2">
              <div className={`text-sm font-semibold ${t.completed ? "text-green-700" : "text-qx-primary"}`}>
                {t.completed ? "Completed" : "Pending"}
              </div>
              <a href={`/tasks/${t.id}`} className="text-xs text-blue-600">View</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
