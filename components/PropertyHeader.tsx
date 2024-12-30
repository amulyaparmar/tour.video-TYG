import React from 'react';
import { Badge } from './Badge';
import { Sparkles, Users, Bot, ArrowUpRight } from 'lucide-react';

export function PropertyHeader() {
  return (
    <div className="flex items-start space-x-8 mt-12">
      <div className="flex-1 space-y-4">
        <div className="flex items-center space-x-4">
          <Badge 
            icon={Sparkles}
            text="👋 Welcome Back, Amulya"
          />
          <Badge 
            icon={Users}
            text="Live Visitors"
            count={4}
            showGlowingIndicator
          />
        </div>
        
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Vue53
        </h1>
        
        <div className="flex items-center space-x-4">
          <a 
            href="https://vue53.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center cursor-pointer"
          >
            <p className="text-xl text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
              https://vue53.com
            </p>
            <ArrowUpRight 
              size={20} 
              className="ml-1 text-gray-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
            />
          </a>
          <div className="h-12 w-12 rounded-xl overflow-hidden border-2 border-white shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=96&h=96&q=80"
              alt="Property"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge 
            icon={Bot}
            text="Update Knowledgebase"
          />
          <Badge 
            icon={Sparkles}
            text="Train with AI"
            className="bg-purple-50 text-purple-600"
          />
        </div>
      </div>
    </div>
  );
}