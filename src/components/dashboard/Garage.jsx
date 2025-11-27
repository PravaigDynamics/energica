import React from 'react';
import { Plus } from 'lucide-react';

const Garage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-200 mb-2">My Garage</h1>
          <p className="text-zinc-400">Manage your Energica motorcycles</p>
        </div>
        <button className="flex items-center gap-2 bg-lime-500 text-black font-semibold px-4 py-3 rounded-lg hover:bg-lime-400 transition-colors">
          <Plus className="w-5 h-5" />
          Add Bike
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-zinc-200 mb-2">EGO+ RS</h3>
          <p className="text-zinc-400 mb-4">VIN: ENER2024001</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Year</span>
              <span className="text-zinc-200">2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Color</span>
              <span className="text-zinc-200">Race Red</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Mileage</span>
              <span className="text-zinc-200">5,420 km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Garage;
