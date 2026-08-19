import React, { useState, useEffect, useRef } from "react";
import { Bell, LogOut, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminTopbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">Admin Console</h1>
        <p className="text-sm text-gray-500">Manage interns, clients, projects & revenue</p>
      </div>

      <div className="flex items-center gap-4" ref={ref}>
        <button className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative">
          <img
            src="https://i.pravatar.cc/40?img=5"
            alt="admin"
            className="w-9 h-9 rounded-full border-2 border-qx-borderHover cursor-pointer"
            onClick={() => setMenuOpen((s) => !s)}
          />

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => { navigate("/admin/users"); setMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <User size={16}/> User Profile
              </button>
              <button
                onClick={() => { navigate("/admin/settings"); setMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <Settings size={16}/> Settings
              </button>
              <hr className="my-1"/>
              <button
                onClick={() => { /* add logout logic */ navigate("/"); }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-red-500"
              >
                <LogOut size={16}/> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
