import React from "react";
import { Users, Layers, CreditCard, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
  { week: "W1", revenue: 10 },
  { week: "W2", revenue: 40 },
  { week: "W3", revenue: 60 },
  { week: "W4", revenue: 80 },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Users</div>
              <div className="text-2xl font-bold">1,250</div>
            </div>
            <Users className="w-8 h-8 text-qx-primary"/>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Active Projects</div>
              <div className="text-2xl font-bold">64</div>
            </div>
            <Layers className="w-8 h-8 text-indigo-500"/>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Monthly Revenue</div>
              <div className="text-2xl font-bold">₹1.2L</div>
            </div>
            <CreditCard className="w-8 h-8 text-green-500"/>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Growth</div>
              <div className="text-2xl font-bold">+24%</div>
            </div>
            <TrendingUp className="w-8 h-8 text-red-500"/>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Revenue Trend</h3>
          <span className="text-sm text-gray-500">Last 4 weeks</span>
        </div>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
