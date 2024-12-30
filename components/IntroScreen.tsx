import React from 'react';
import { ArrowRight, Code, Globe, Inbox } from 'lucide-react';
import { HeroMedia } from './HeroMedia';
import { LeadsPreview } from './previews/LeadsPreview';
import { InboxPreview } from './previews/InboxPreview';
import { PropertyHeader } from './PropertyHeader';
import { ActionButtons } from './ActionButtons';

export function IntroScreen({ startScreenObject }: { startScreenObject: any }) {
  return (
    // bg-gradient-to-br from-blue-50 via-white to-purple-50 
    <div className="min-h-[calc(100vh-1rem)] flex items-center p-8">
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="relative">
            <div className="absolute -top-24 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -top-24 left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
            
            <div className="relative space-y-8">
              <PropertyHeader />

              <div className="flex items-center space-x-4">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium 
                  flex items-center space-x-2 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-200">
                  <span>Send Tour</span>
                  <ArrowRight size={20} />
                </button>
                <button className="px-8 py-4 bg-white text-gray-800 rounded-xl font-medium 
                  flex items-center space-x-2 hover:bg-gray-50 transform hover:-translate-y-0.5 transition-all duration-200
                  border border-gray-200">
                  <Code size={20} />
                  <span>View Leads</span>
                </button>
              </div>
            </div>
          </div>

          <HeroMedia startScreenObject={startScreenObject} />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <InboxPreview />
          <LeadsPreview />
        </div>

        <ActionButtons />

        <div className="grid grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <Inbox className="text-blue-500" size={24} />,
              title: 'Inbox',
              description: 'Manage all your communications and leads in one centralized inbox.'
            },
            {
              icon: <Code className="text-purple-500" size={24} />,
              title: 'View Leads',
              description: 'Track and manage your leads with our powerful lead management system.'
            },
            {
              icon: <Globe className="text-green-500" size={24} />,
              title: 'View Analytics',
              description: 'Get detailed insights and analytics about your business performance.'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 
              hover:bg-white hover:shadow-lg transition-all duration-200 border border-gray-100">
              <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}