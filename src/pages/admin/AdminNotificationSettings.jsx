import React, { useState } from "react";
import { Bell, Mail, MessageSquare, Shield } from "lucide-react";

export default function AdminNotificationSettings() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    systemNotifications: true,
    newUserSignup: true,
    projectUpdates: true,
    internRequests: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert("✅ Notification settings saved successfully!");
    // In production, here you’d call your backend API to persist settings
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Bell className="text-qx-primary" /> Notification Settings
      </h2>

      <div className="space-y-6">
        {/* Email Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-600" /> Email Alerts
            </h3>
            <p className="text-gray-500 text-sm">
              Receive admin updates and reports on your registered email.
            </p>
          </div>
          <Switch checked={settings.emailAlerts} onChange={() => handleToggle("emailAlerts")} />
        </div>

        {/* SMS Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-600" /> SMS Alerts
            </h3>
            <p className="text-gray-500 text-sm">
              Get instant SMS notifications for urgent events.
            </p>
          </div>
          <Switch checked={settings.smsAlerts} onChange={() => handleToggle("smsAlerts")} />
        </div>

        {/* System Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-600" /> System Notifications
            </h3>
            <p className="text-gray-500 text-sm">
              Receive dashboard alerts for admin activities or errors.
            </p>
          </div>
          <Switch
            checked={settings.systemNotifications}
            onChange={() => handleToggle("systemNotifications")}
          />
        </div>

        {/* Other toggles */}
        <ToggleRow
          label="New User Signup"
          desc="Be notified whenever a new intern or client registers."
          checked={settings.newUserSignup}
          onChange={() => handleToggle("newUserSignup")}
        />
        <ToggleRow
          label="Project Updates"
          desc="Receive project status updates and completion alerts."
          checked={settings.projectUpdates}
          onChange={() => handleToggle("projectUpdates")}
        />
        <ToggleRow
          label="Intern Requests"
          desc="Get notified when an intern submits a request or query."
          checked={settings.internRequests}
          onChange={() => handleToggle("internRequests")}
        />

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            className="bg-qx-primary hover:bg-qx-primary text-white px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// 🧩 Reusable Toggle Row
function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium text-gray-800">{label}</h3>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}

// 🧠 Simple Switch Component
function Switch({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      ></span>
    </button>
  );
}
