import React, { useEffect, useState } from "react";
import TasksPanel from "./TasksPanel";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const internId = 1; // TODO: Login से real internId प्राप्त करेंगे

  useEffect(() => {
    fetch(`http://localhost:8083/task/intern/${internId}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [internId]); // internId dependency add की ताकि future में login से dynamically आए

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-2">🧾 Assigned Tasks Dashboard</h2>
        <p className="text-gray-600 mb-6">
          View and manage your internship tasks here. Use filters or search to quickly find tasks.
        </p>

        {/* TasksPanel with fixes */}
        <TasksPanel tasks={tasks} internId={internId} setTasks={setTasks} />
      </div>
    </div>
  );
}
