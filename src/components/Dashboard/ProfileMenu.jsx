import React from "react";
import { LogOut, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
      <button
        onClick={() => navigate("/dashboard/profile")}
        className="w-full flex items-center px-3 py-2 hover:bg-gray-100"
      >
        <User size={16} className="mr-2" /> My Profile
      </button>
      <button
        onClick={() => navigate("/change-password")}
        className="w-full flex items-center px-3 py-2 hover:bg-gray-100"
      >
        <Lock size={16} className="mr-2" /> Change Password
      </button>
      <button
        onClick={() => navigate("/logout")}
        className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-gray-100"
      >
        <LogOut size={16} className="mr-2" /> Logout
      </button>
    </div>
  );
};

export default ProfileMenu;
