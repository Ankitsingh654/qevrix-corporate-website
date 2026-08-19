import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Users, FileText, Award, Activity } from "lucide-react";

export default function Analytics() {
  // 🔹 Dummy analytics data
  const userStats = [
    { month: "Jan", users: 200, active: 150 },
    { month: "Feb", users: 300, active: 180 },
    { month: "Mar", users: 500, active: 320 },
    { month: "Apr", users: 600, active: 400 },
    { month: "May", users: 750, active: 520 },
    { month: "Jun", users: 900, active: 650 },
  ];

  const taskStats = [
    { name: "Internship A", tasks: 120 },
    { name: "Internship B", tasks: 80 },
    { name: "Internship C", tasks: 140 },
    { name: "Internship D", tasks: 60 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        📊 Admin Analytics Dashboard
      </h1>

      {/* 🧩 Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Total Users
              </h3>
              <p className="text-2xl font-bold text-gray-800">12,450</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Active Interns
              </h3>
              <p className="text-2xl font-bold text-gray-800">980</p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-qx-borderHover">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Certificates Issued
              </h3>
              <p className="text-2xl font-bold text-gray-800">1,320</p>
            </div>
            <Award className="w-8 h-8 text-qx-primary" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Reports Generated
              </h3>
              <p className="text-2xl font-bold text-gray-800">420</p>
            </div>
            <FileText className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* 📈 Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Monthly User Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Task Completion Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Tasks Completed by Internship
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
