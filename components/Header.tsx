import React from 'react';
import { LayoutDashboard, Users, LifeBuoy } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="bg-black text-white p-2 rounded">
              <LayoutDashboard size={20} />
            </div>
            <span className="font-semibold">AtoZ Portal</span>
          </div>
          
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-900">Dashboard</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Users</a>
            <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-1">
              <LifeBuoy size={18} />
              <span>Support</span>
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-700">AtoZ</span>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Users size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}