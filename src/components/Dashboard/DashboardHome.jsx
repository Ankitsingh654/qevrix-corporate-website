import React from "react";
import {
  ClipboardList,
  Award,
  BarChart2,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "Week 1", progress: 20 },
  { week: "Week 2", progress: 40 },
  { week: "Week 3", progress: 65 },
  { week: "Week 4", progress: 85 },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Top Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Internship Overview
        </h1>
        <p className="text-gray-500">
          Track your progress, performance, and milestones.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tasks Completed</p>
              <h2 className="text-2xl font-bold text-gray-800">24 / 30</h2>
            </div>
            <ClipboardList className="w-8 h-8 text-qx-primary" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Overall Progress</p>
              <h2 className="text-2xl font-bold text-gray-800">82%</h2>
            </div>
            <BarChart2 className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Certificates Earned</p>
              <h2 className="text-2xl font-bold text-gray-800">2</h2>
            </div>
            <Award className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Attendance</p>
              <h2 className="text-2xl font-bold text-gray-800">96%</h2>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Weekly Progress
          </h2>
          <span className="text-sm text-qx-textMuted">Last 4 Weeks</span>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#fbbf24"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-3 text-gray-600">
          <li>✅ Completed “API Integration Task”</li>
          <li>📚 Watched React Hooks tutorial</li>
          <li>🏆 Earned Certificate in Frontend Module</li>
          <li>📅 Attended Weekly Mentor Session</li>
        </ul>
      </div>
    </div>
  );
}
