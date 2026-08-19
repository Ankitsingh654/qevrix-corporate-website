// src/components/dashboard/AnnouncementsPanel.jsx
import React from "react";

export default function AnnouncementsPanel({ announcements = [] }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Announcements</h3>
        <span className="text-sm text-qx-textMuted">{announcements.length}</span>
      </div>

      <ul className="mt-3 space-y-3 max-h-56 overflow-auto">
        {announcements.length === 0 && <li className="text-sm text-qx-textMuted">No announcements</li>}
        {announcements.map((a) => (
          <li key={a.id} className="p-3 border rounded hover:bg-gray-50">
            <div className="flex justify-between">
              <div className="font-medium">{a.title}</div>
              <div className="text-xs text-qx-textMuted">{new Date(a.date).toLocaleDateString()}</div>
            </div>
            <div className="text-sm text-gray-600 mt-1">{a.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
