import React, { useState } from "react";
import { Mail, Phone, MapPin, Edit3, Save, User } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Ankit Kumar Singh",
    email: "ankit108singh2025@gmail.com",
    phone: "+91 8375859948",
    location: "Patna, Bihar, India",
    university: "Lovely Professional University",
    branch: "Computer Science",
    internshipRole: "Frontend Developer Intern",
    joinDate: "01 Nov 2025",
    endDate: "31 Jan 2026",
    profilePic:
      "https://api.dicebear.com/9.x/adventurer/svg?seed=ankit", // Avatar placeholder
  });

  const handleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // ✅ Later: call backend API to update profile
    console.log("Profile updated:", profile);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl mx-auto transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={profile.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <User size={22} className="text-indigo-600" />
              {profile.name}
            </h2>
            <p className="text-sm text-gray-500">{profile.internshipRole}</p>
          </div>
        </div>
        <button
          onClick={isEditing ? handleSave : handleEdit}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium mt-4 sm:mt-0 ${
            isEditing
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
          {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            <Mail size={16} /> Email
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-gray-800 mt-1">{profile.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            <Phone size={16} /> Phone
          </label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-gray-800 mt-1">{profile.phone}</p>
          )}
        </div>

        {/* University */}
        <div>
          <label className="text-sm font-semibold text-gray-600">University</label>
          {isEditing ? (
            <input
              type="text"
              name="university"
              value={profile.university}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-gray-800 mt-1">{profile.university}</p>
          )}
        </div>

        {/* Branch */}
        <div>
          <label className="text-sm font-semibold text-gray-600">Branch</label>
          {isEditing ? (
            <input
              type="text"
              name="branch"
              value={profile.branch}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-gray-800 mt-1">{profile.branch}</p>
          )}
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            <MapPin size={16} /> Location
          </label>
          {isEditing ? (
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-gray-800 mt-1">{profile.location}</p>
          )}
        </div>
      </div>

      {/* Internship Info */}
      <div className="mt-8 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Internship Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-medium text-gray-800">{profile.joinDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">End Date</p>
            <p className="font-medium text-gray-800">{profile.endDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
