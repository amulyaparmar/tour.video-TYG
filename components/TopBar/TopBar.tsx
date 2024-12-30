import React from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { UserControls } from './UserControls';
import { SidebarTrigger } from '../ui/sidebar';

export function TopBar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <SidebarTrigger />
          <Logo />
          <Navigation />
        </div>
        <UserControls />
      </div>
    </header>
  );
}