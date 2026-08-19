import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  ShoppingBag,
  LineChart,
  Settings,
  Bell,
  Search,
} from "lucide-react";

const chartData = [
  { month: "Jan", revenue: 800 },
  { month: "Feb", revenue: 1200 },
  { month: "Mar", revenue: 900 },
  { month: "Apr", revenue: 1500 },
  { month: "May", revenue: 2000 },
  { month: "Jun", revenue: 1800 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, key: "overview", path: "/admin" },
    { name: "Assign Task", icon: Settings, key: "assign-task", path: "/admin/assign-task" },
    { name: "Interns", icon: Users, key: "interns", path: "/admin/interns" },
    { name: "Projects", icon: Briefcase, key: "projects", path: "/admin/projects" },
    { name: "SaaS Products", icon: ShoppingBag, key: "saas", path: "/admin/saas" },
    { name: "Reports", icon: LineChart, key: "reports", path: "/admin/reports" },
    { name: "Settings", icon: Settings, key: "settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-white">
      {/* 🧭 Sidebar */}
      <aside className="w-64 bg-qx-surface border-r border-qx-borderHover flex flex-col">
        <div className="text-center py-6 border-b border-qx-borderHover">
          <h1 className="text-2xl font-extrabold text-qx-primary">QEVRIX Admin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                navigate(item.path); // Navigate to nested route
              }}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeTab === item.key
                  ? "bg-qx-primary text-black font-semibold"
                  : "text-qx-textMuted hover:bg-qx-surfaceHover hover:text-qx-primary"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 text-center border-t border-qx-borderHover text-qx-textMuted text-sm">
          © 2025 QEVRIX
        </div>
      </aside>

      {/* 📊 Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* 🔝 Topbar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-qx-primary capitalize">
            {activeTab}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-qx-textMuted" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-qx-surface pl-9 pr-4 py-2 rounded-lg border border-qx-borderHover text-sm text-qx-textMuted focus:outline-none focus:border-qx-borderHover"
              />
            </div>
            <button className="p-2 rounded-full bg-qx-surface hover:bg-qx-surfaceHover">
              <Bell className="text-qx-primary" size={20} />
            </button>
            <img
              src="https://api.dicebear.com/8.x/avataaars/svg?seed=QEVRIX"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border border-qx-borderHover"
            />
          </div>
        </div>

        {/* 📈 Overview Page */}
        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
              {[
                { title: "Total Interns", value: "48", icon: Users },
                { title: "Active Projects", value: "12", icon: Briefcase },
                { title: "Products Sold", value: "128", icon: ShoppingBag },
                { title: "Monthly Revenue", value: "₹1.2L", icon: LineChart },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-qx-surface border border-qx-borderHover p-6 rounded-2xl hover:shadow-qx-primary/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <card.icon className="text-qx-primary" size={28} />
                  </div>
                  <h3 className="text-qx-textMuted text-sm">{card.title}</h3>
                  <p className="text-2xl font-bold text-qx-primary">{card.value}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-qx-surface border border-qx-borderHover rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-qx-primary">
                Revenue Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111",
                      border: "1px solid #FFD700",
                    }}
                  />
                  <Bar dataKey="revenue" fill="#FFD700" radius={6} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* 🚀 Nested Routes Render */}
        <Outlet />
      </main>
    </div>
  );
}
