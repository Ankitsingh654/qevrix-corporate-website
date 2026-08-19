import React, { useState, useEffect } from "react";

/**
 * Users table UI (mocked)
 * Replace mock fetch with real API call later
 */

const mockUsers = [
  { id: 1, name: "Amit Sharma", email: "amit@example.com", role: "intern", joined: "2025-09-04" },
  { id: 2, name: "Priya Verma", email: "priya@example.com", role: "intern", joined: "2025-08-21" },
  { id: 3, name: "Ravi Kumar", email: "ravi@example.com", role: "client", joined: "2025-07-11" },
];

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // replace with: fetch("/api/admin/users")
    setTimeout(() => setUsers(mockUsers), 300);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Users</h3>
        <div>
          <button className="px-3 py-2 bg-qx-primary text-black rounded-md">Invite User</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="text-sm text-gray-500">
            <tr>
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Role</th>
              <th className="py-2 px-3">Joined</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((u, i) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-3">{i + 1}</td>
                <td className="py-3 px-3 font-medium">{u.name}</td>
                <td className="py-3 px-3">{u.email}</td>
                <td className="py-3 px-3">{u.role}</td>
                <td className="py-3 px-3">{u.joined}</td>
                <td className="py-3 px-3">
                  <button className="px-2 py-1 text-sm bg-indigo-50 text-indigo-600 rounded mr-2">View</button>
                  <button className="px-2 py-1 text-sm bg-red-50 text-red-600 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
