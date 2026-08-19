import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  ClipboardList,
  BarChart2,
  BookOpen,
  Award,
  Bell,
  User,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/internship-dashboard" },
  { name: "Tasks", icon: ClipboardList, path: "/internship-dashboard/tasks" },
  { name: "Progress", icon: BarChart2, path: "/internship-dashboard/progress" },
  { name: "Resources", icon: BookOpen, path: "/internship-dashboard/resources" },
  { name: "Certificates", icon: Award, path: "/internship-dashboard/certificates" },
  { name: "Notifications", icon: Bell, path: "/internship-dashboard/notifications" },
  { name: "Attandance Panel", icon: User, path: "/internship-dashboard/attendance" },
  { name: "Project Progress", icon: User, path: "/internship-dashboard/projectprogress" },
  { name: "Profile Card", icon: User, path: "/internship-dashboard/profilecard" },
   { name: "Announcement Panel", icon: User, path: "/internship-dashboard/panel" },
   { name: "Attendance", icon: User, path: "/internship-dashboard/panel" },
  { name: "Profile", icon: User, path: "/internship-dashboard/profile" },
  
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-qx-surface text-gray-200 flex flex-col">
      <div className="p-4 text-2xl font-bold text-qx-primary">QEVRIX</div>
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/internship-dashboard"}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md transition-all ${
                isActive ? "bg-qx-primary text-white" : "hover:bg-qx-surfaceHover"
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-qx-border text-sm text-qx-textMuted">
        © 2025 QEVRIX
      </div>
    </aside>
  );
}
