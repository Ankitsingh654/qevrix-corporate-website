import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Layers,
  BarChart2,
  CreditCard,
  Settings,
  Bell,
} from "lucide-react";

const items = [
  { to: "/admin", label: "Overview", icon: Home },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/projects", label: "Projects", icon: Layers },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/notifications", label: "Announcements", icon: Bell },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-qx-surface text-gray-200 flex flex-col">
      <div className="px-6 py-5 text-2xl font-bold text-qx-primary">QEVRIX Admin</div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <NavLink
              key={it.to}
              to={it.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                  isActive ? "bg-qx-primary text-black font-semibold" : "hover:bg-qx-surface/40"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{it.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t border-qx-border text-sm text-qx-textMuted">
        © 2025 QEVRIX
      </div>
    </aside>
  );
}
