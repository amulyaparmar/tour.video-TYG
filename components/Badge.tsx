import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
  icon: LucideIcon;
  text: string;
  count?: number;
  className?: string;
  showGlowingIndicator?: boolean;
}

export function Badge({ icon: Icon, text, count, className = '', showGlowingIndicator }: BadgeProps) {
  return (
    <div className={`inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-medium text-sm ${className}`}>
      <Icon size={16} className="mr-2" />
      <span>{text}</span>
      {count !== undefined && (
        <span className="ml-2 bg-blue-100 px-2 py-0.5 rounded-full">{count}</span>
      )}
      {showGlowingIndicator && (
        <span className="relative ml-2 w-2.5 h-2.5">
          <span className="absolute inset-0 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75" />
        </span>
      )}
    </div>
  );
}