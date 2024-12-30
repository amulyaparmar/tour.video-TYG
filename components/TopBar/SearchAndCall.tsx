import React, { useState } from 'react';
import { Search, Phone } from 'lucide-react';

export function SearchAndCall() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="flex items-center space-x-3">
      <div className={`
        relative flex items-center transition-all duration-200
        ${isSearchFocused ? 'w-72' : 'w-64'}
      `}>
        <Search className="absolute left-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg 
            text-sm transition-all duration-200 placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>
      
      <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 
        text-gray-600 hover:text-gray-900">
        <Phone size={18} />
      </button>
    </div>
  );
}