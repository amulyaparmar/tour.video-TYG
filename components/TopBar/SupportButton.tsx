import React from 'react';
import { LifeBuoy } from 'lucide-react';

export function SupportButton() {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-colors duration-200">
      <LifeBuoy size={18} />
      <span>Support</span>
    </button>
  );
}