import React, { useState } from 'react';
import { ButtonGroup } from './ButtonGroup';
import { SearchAndCall } from './SearchAndCall';
import { SupportButton } from './SupportButton';

export function Navigation() {
  const [activeTab, setActiveTab] = useState('inbox');

  const buttons = [
    { label: 'Inbox', isActive: activeTab === 'inbox', onClick: () => setActiveTab('inbox'), badge: 4 },
    { label: 'Tour', isActive: activeTab === 'tour', onClick: () => setActiveTab('tour') },
    { label: 'Leads', isActive: activeTab === 'leads', onClick: () => setActiveTab('leads') },
    { label: 'Reports', isActive: activeTab === 'reports', onClick: () => setActiveTab('reports') }
  ];

  return (
    <nav className="flex items-center space-x-6">
      <ButtonGroup buttons={buttons} />
      <SearchAndCall />
      <SupportButton />
    </nav>
  );
}