import React, { useState } from 'react';
import { Mail, MessageCircle, Copy, Check } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [shareMethod, setShareMethod] = useState<'email' | 'message'>('email');
  const [recipient, setRecipient] = useState('');
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://new-videomagnet-658y.onrender.com/dashboard/community/magnet/page";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4">Share Video</h3>
        
        <div className="bg-gray-100 p-1 rounded-lg flex mb-4">
          <button
            onClick={() => setShareMethod('email')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all ${
              shareMethod === 'email' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
            }`}
          >
            <Mail size={18} />
            <span>Email</span>
          </button>
          <button
            onClick={() => setShareMethod('message')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all ${
              shareMethod === 'message' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
            }`}
          >
            <MessageCircle size={18} />
            <span>Message</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {shareMethod === 'email' ? 'Email Address' : 'Phone Number'}
            </label>
            <input
              type={shareMethod === 'email' ? 'email' : 'tel'}
              placeholder={shareMethod === 'email' ? 'name@example.com' : '+1 (555) 000-0000'}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="w-full px-4 py-2 pr-12 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-md transition-colors"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle share logic here
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}