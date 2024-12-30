import React from 'react';
import { Play } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      {/* <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
        <Play size={20} className="text-blue-500" />
      </button> */}
      {/* <span className="font-semibold">Tour</span> */}
      <img src="https://framerusercontent.com/images/JFQ6FwS16xeou373Xw6zKUYsYw.png" alt="Tour Logo" className="h-[30px]" />
    </div>
  );
}