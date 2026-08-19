import React from "react";

const sample = [
  { id: "TRX001", user: "Client A", amount: 15000, date: "2025-10-02", status: "Paid" },
  { id: "TRX002", user: "Client B", amount: 9999, date: "2025-10-10", status: "Pending" },
];

export default function Payments() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Payments</h3>
      <table className="min-w-full text-left">
        <thead className="text-sm text-gray-500">
          <tr>
            <th className="py-2 px-3">Txn ID</th>
            <th className="py-2 px-3">User</th>
            <th className="py-2 px-3">Amount</th>
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {sample.map(s => (
            <tr key={s.id} className="border-t hover:bg-gray-50">
              <td className="py-3 px-3">{s.id}</td>
              <td className="py-3 px-3">{s.user}</td>
              <td className="py-3 px-3">₹{s.amount}</td>
              <td className="py-3 px-3">{s.date}</td>
              <td className="py-3 px-3">{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
