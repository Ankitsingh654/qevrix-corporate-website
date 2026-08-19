// src/components/dashboard/ProfileCard.jsx
import React from "react";

export default function ProfileCard({ profile }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex items-center gap-4">
        <img
          src={profile?.profileImage || "/default-avatar.png"}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">{profile?.name}</div>
          <div className="text-sm text-gray-500">{profile?.role}</div>
          <div className="text-xs text-qx-textMuted mt-2">Intern ID: {profile?.id}</div>
          <div className="text-xs text-qx-textMuted">Mentor: {profile?.mentorName || "—"}</div>
        </div>
      </div>

      <hr className="my-4" />

      <div className="text-sm text-gray-600 space-y-1">
        <div>Joined: {profile?.joinedAt ? new Date(profile.joinedAt).toLocaleDateString() : "-"}</div>
        <div>Current Project: {profile?.currentProject || "-"}</div>
      </div>
    </div>
  );
}
