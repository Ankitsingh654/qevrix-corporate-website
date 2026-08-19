import React, { useState } from "react";
import axios from "axios";

export default function Progress() {
  const [form, setForm] = useState({
    internId: "",
    taskCompleted: "",
    hoursSpends: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitProgress = async () => {
    try {
      const res = await axios.post("http://localhost:8084/progress/add", form);
      alert("Progress added successfully!");
      console.log("Response:", res.data);
    } catch (error) {
      alert("Failed to add progress");
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">📈 Internship Progress</h2>

      {/* --- Form Fields --- */}
      <div className="space-y-4">

        <input
          type="number"
          name="internId"
          placeholder="Intern ID"
          value={form.internId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="taskCompleted"
          placeholder="Tasks Completed"
          value={form.taskCompleted}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="hoursSpends"
          placeholder="Hours Spent"
          value={form.hoursSpends}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={submitProgress}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Progress
        </button>
      </div>
    </div>
  );
}
