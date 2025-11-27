import React from 'react';
import { Users, Activity, Shield } from 'lucide-react';

const AdminPanel = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-500 mb-2">Admin Panel</h1>
        <p className="text-zinc-400">System management and oversight</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 border border-purple-500 rounded-lg p-6">
          <Users className="w-8 h-8 text-purple-500 mb-3" />
          <p className="text-2xl font-bold text-zinc-200 mb-1">1,248</p>
          <p className="text-sm text-zinc-400">Total Users</p>
        </div>

        <div className="bg-zinc-900 border border-purple-500 rounded-lg p-6">
          <Activity className="w-8 h-8 text-purple-500 mb-3" />
          <p className="text-2xl font-bold text-zinc-200 mb-1">98.5%</p>
          <p className="text-sm text-zinc-400">System Uptime</p>
        </div>

        <div className="bg-zinc-900 border border-purple-500 rounded-lg p-6">
          <Shield className="w-8 h-8 text-purple-500 mb-3" />
          <p className="text-2xl font-bold text-zinc-200 mb-1">Active</p>
          <p className="text-sm text-zinc-400">Security Status</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-zinc-200 mb-4">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400">Name</th>
                <th className="text-left py-3 px-4 text-zinc-400">Email</th>
                <th className="text-left py-3 px-4 text-zinc-400">Role</th>
                <th className="text-left py-3 px-4 text-zinc-400">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800">
                <td className="py-3 px-4 text-zinc-200">John Doe</td>
                <td className="py-3 px-4 text-zinc-400">john@example.com</td>
                <td className="py-3 px-4"><span className="text-lime-500">User</span></td>
                <td className="py-3 px-4"><span className="text-lime-500">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
