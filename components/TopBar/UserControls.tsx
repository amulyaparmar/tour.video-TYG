import React from 'react';
import { Users } from 'lucide-react';

export function UserControls() {
  return (
    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
      <Users size={20} />
    </button>
  );
}