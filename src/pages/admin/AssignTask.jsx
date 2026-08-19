import React, { useState } from "react";

export default function AssignTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "LOW",
    internId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const assignTask = async () => {
    // Simple validation
    if (!task.title || !task.description || !task.internId) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8083/task/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || "Task assign failed");
      }

      const data = await response.json();
      alert("✅ Task Assigned Successfully!");

      // Reset form
      setTask({ title: "", description: "", priority: "LOW", internId: "" });

    } catch (err) {
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-qx-surface text-white p-10">
      <h2 className="text-3xl font-bold mb-6 text-qx-primary">Assign Task</h2>

      <div className="bg-qx-surface border border-qx-border p-6 rounded-xl w-full max-w-xl shadow-xl space-y-5">
        <div>
          <label className="text-sm text-qx-textMuted">Task Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            placeholder="Enter task title"
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-qx-surface border border-qx-border focus:border-qx-borderHover outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-qx-textMuted">Description</label>
          <textarea
            name="description"
            value={task.description}
            placeholder="Write task details..."
            rows="4"
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-qx-surface border border-qx-border focus:border-qx-borderHover outline-none"
          ></textarea>
        </div>

        <div>
          <label className="text-sm text-qx-textMuted">Priority</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-qx-surface border border-qx-border focus:border-qx-borderHover outline-none"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-qx-textMuted">Intern ID</label>
          <input
            type="number"
            name="internId"
            value={task.internId}
            placeholder="Enter intern ID"
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-qx-surface border border-qx-border focus:border-qx-borderHover outline-none"
          />
        </div>

        <button
          onClick={assignTask}
          disabled={loading}
          className={`w-full text-black font-bold p-3 rounded-lg text-lg transition ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-qx-primary hover:bg-qx-primary"
          }`}
        >
          {loading ? "Assigning..." : "Assign Task"}
        </button>
      </div>
    </div>
  );
}
