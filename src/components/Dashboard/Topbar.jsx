import React, { useState, useEffect, useRef } from "react";
import { Bell, LogOut, User, Settings, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Intern");
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // 🔥 Fetch user data from backend → GET /api/auth/me
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    fetch("http://localhost:8082/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Me API Response →", data);

        if (data.fullName) {
          setUserName(data.fullName.split(" ")[0]); // first name
        } else if (data.email) {
          setUserName(data.email.split("@")[0]); // email prefix
        }
      })
      .catch((err) => console.error("User fetch error:", err));
  }, []);

  // 🔒 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b">
      <h2 className="text-lg font-semibold text-gray-800">
        Welcome, <span className="text-qx-primary">{userName}</span> 👋
      </h2>

      <div className="flex items-center gap-4 relative" ref={menuRef}>
        {/* 🔔 Notification Bell */}
        <button className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* 👤 Profile Avatar */}
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-9 h-9 rounded-full border-2 border-qx-borderHover cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {/* ⚙️ Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 top-12 w-52 bg-white border rounded-xl shadow-lg py-2 z-50 animate-fadeIn">
            <button
              onClick={() => {
                navigate("/internship-dashboard/profile");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              <User size={16} /> View Profile
            </button>

            <button
              onClick={() => {
                navigate("/internship-dashboard/profile?edit=true");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              <Edit size={16} /> Edit Profile
            </button>

            <button
              onClick={() => {
                navigate("/internship-dashboard/settings");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              <Settings size={16} /> Settings
            </button>

            <hr className="my-1" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-red-500"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
