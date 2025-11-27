import React from 'react';
import { Calendar, Book, Download, MessageCircle } from 'lucide-react';

const Service = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-200 mb-2">Service Center</h1>
        <p className="text-zinc-400">Maintenance and support for your Energica</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-zinc-200 mb-4">Warranty Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-400">Coverage</span>
              <span className="text-lime-500">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Expires</span>
              <span className="text-zinc-200">Dec 2025</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-zinc-200 mb-4">Next Service</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-400">Due in</span>
              <span className="text-zinc-200">45 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Type</span>
              <span className="text-zinc-200">Annual</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="flex flex-col items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-lime-500 transition-colors">
          <Calendar className="w-8 h-8 text-lime-500" />
          <span className="text-zinc-200 font-medium">Book Service</span>
        </button>

        <button className="flex flex-col items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-lime-500 transition-colors">
          <Book className="w-8 h-8 text-lime-500" />
          <span className="text-zinc-200 font-medium">Manuals</span>
        </button>

        <button className="flex flex-col items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-lime-500 transition-colors">
          <Download className="w-8 h-8 text-lime-500" />
          <span className="text-zinc-200 font-medium">Download Parts</span>
        </button>

        <button className="flex flex-col items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-lime-500 transition-colors">
          <MessageCircle className="w-8 h-8 text-lime-500" />
          <span className="text-zinc-200 font-medium">Live Support</span>
        </button>
      </div>
    </div>
  );
};

export default Service;
