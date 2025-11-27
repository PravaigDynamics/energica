import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Activity, Wrench, Award, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const stats = [
    { label: 'Total Miles', value: '12,458', icon: Activity, color: 'text-lime-500' },
    { label: 'Service Due', value: '45 days', icon: Wrench, color: 'text-blue-500' },
    { label: 'Achievements', value: '24', icon: Award, color: 'text-yellow-500' },
    { label: 'Member Since', value: '2023', icon: Calendar, color: 'text-purple-500' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-200 mb-2">
          Welcome back, {currentUser?.displayName || 'Rider'}!
        </h1>
        <p className="text-zinc-400">Here's what's happening with your Energica</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-zinc-200 mb-1">{stat.value}</p>
            <p className="text-sm text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-zinc-200 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-lime-500 text-black font-semibold py-3 rounded-lg hover:bg-lime-400 transition-colors">
              Book Service
            </button>
            <button className="w-full bg-zinc-800 text-zinc-200 font-semibold py-3 rounded-lg hover:bg-zinc-700 transition-colors">
              View Manual
            </button>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-zinc-200 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-lime-500 rounded-full mt-2"></div>
              <div>
                <p className="text-zinc-200">Software Update Available</p>
                <p className="text-sm text-zinc-400">2 days ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-zinc-200">Service Completed</p>
                <p className="text-sm text-zinc-400">1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
