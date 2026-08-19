// src/components/dashboard/AttendancePanel.jsx
import React from "react";

export default function AttendancePanel({ attendance }) {
  // attendance expected: { percentage: number, lastMonth: {...} }
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="font-semibold">Attendance</h3>
      <div className="mt-3 flex items-end gap-4">
        <div className="text-3xl font-bold">{attendance?.percentage ?? 0}%</div>
        <div className="text-xs text-gray-500">Last 30 days</div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <div>Present days: {attendance?.present ?? "-"}</div>
        <div>Absent days: {attendance?.absent ?? "-"}</div>
        <div>Late: {attendance?.late ?? "-"}</div>
      </div>
    </div>
  );
}
