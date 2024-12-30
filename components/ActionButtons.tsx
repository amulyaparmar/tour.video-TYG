import React from 'react';
import { Video, MessageSquare } from 'lucide-react';

export function ActionButtons() {
  return (
    <div className="grid grid-cols-2 gap-8 mt-8">
      <button className="flex items-center justify-center space-x-3 px-6 py-4 bg-blue-600 text-white rounded-xl 
        hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 group">
        <Video size={24} className="group-hover:scale-110 transition-transform duration-200" />
        <span className="text-lg font-medium">Enter Tour Room</span>
      </button>
      
      <button className="flex items-center justify-center space-x-3 px-6 py-4 bg-purple-600 text-white rounded-xl 
        hover:bg-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 group">
        <MessageSquare size={24} className="group-hover:scale-110 transition-transform duration-200" />
        <span className="text-lg font-medium">Message Leads</span>
      </button>
    </div>
  );
}