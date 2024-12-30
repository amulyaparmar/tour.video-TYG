import React from 'react';
import { Mail, MessageSquare, ArrowUpRight } from 'lucide-react';

const messages = [
  { 
    type: 'email',
    from: 'John Smith',
    subject: 'Property Inquiry',
    time: '10m ago',
    unread: true 
  },
  { 
    type: 'message',
    from: 'Lisa Anderson',
    subject: 'Viewing Schedule',
    time: '1h ago',
    unread: false 
  },
  { 
    type: 'email',
    from: 'Robert Chen',
    subject: 'Price Question',
    time: '2h ago',
    unread: true 
  },
];

export function InboxPreview() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold">Inbox</h3>
        <button className="text-blue-500 hover:text-blue-600 p-1 rounded-lg hover:bg-blue-50 transition-colors">
          <ArrowUpRight size={18} />
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {messages.map((message) => (
          <div key={message.subject} className="p-3 flex items-center hover:bg-gray-50 transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
              message.type === 'email' 
                ? 'bg-purple-100' 
                : 'bg-blue-100'
            }`}>
              {message.type === 'email' 
                ? <Mail size={16} className="text-purple-600" />
                : <MessageSquare size={16} className="text-blue-600" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{message.from}</p>
              <p className="text-sm text-gray-500 truncate">{message.subject}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">{message.time}</p>
              {message.unread && (
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}