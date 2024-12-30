import React from 'react';

interface NavItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function NavItem({ label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-sm transition-colors duration-200 ${
        isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transform transition-transform duration-200" />
      )}
    </button>
  );
}