import React from "react";

export default function Settings() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">⚙️ Account Settings</h2>
      <p className="text-gray-700">
        Manage your account preferences, notifications, and security options here.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Change Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Notification Preferences
          </label>
          <select className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Email Only</option>
            <option>SMS Only</option>
            <option>Email + SMS</option>
            <option>None</option>
          </select>
        </div>

        <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}
