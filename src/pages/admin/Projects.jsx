import React from "react";

const mock = [
  { id: 1, title: "BillPro App", owner: "Client A", status: "Live", price: "₹15,000" },
  { id: 2, title: "EduSheet", owner: "Client B", status: "In Progress", price: "₹9,999" },
];

export default function Projects() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Projects</h3>
        <button className="px-3 py-2 bg-qx-primary rounded text-black">New Project</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {mock.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{p.title}</h4>
              <p className="text-sm text-gray-500">{p.owner} · {p.status}</p>
            </div>
            <div className="text-right">
              <div className="font-semibold">{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
