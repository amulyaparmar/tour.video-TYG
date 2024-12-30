import React from 'react';
import { Circle } from 'lucide-react';

interface BrowserWindowProps {
  children: React.ReactNode;
}

export function BrowserWindow({ children }: BrowserWindowProps) {
  return (
    <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 bg-white">
      {/* Browser Header */}
      <div className="bg-gray-100/80 backdrop-blur-sm px-4 py-3 border-b border-gray-200/50">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <Circle size={12} className="text-red-500 fill-current" />
            <Circle size={12} className="text-yellow-500 fill-current" />
            <Circle size={12} className="text-green-500 fill-current" />
          </div>
          <div className="flex-1 mx-auto max-w-sm">
            <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm text-gray-500 text-center">
              tour.video/@vue53
            </div>
          </div>
        </div>
      </div>
      
      {/* Browser Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}