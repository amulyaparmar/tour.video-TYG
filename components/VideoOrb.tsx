import React from 'react';
import { motion } from 'framer-motion';
import { Edit3 } from 'lucide-react';

export function VideoOrb() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
      className="absolute bottom-8 right-8 group"
    >
      <div 
        className="relative w-48 h-48 rounded-full border-[4px] border-white shadow-xl overflow-hidden 
          transition-transform duration-300 group-hover:scale-105"
        title="Click to edit thumbnail"
      >
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=384&h=384&q=80" 
          alt="Special offer thumbnail"
          className="w-full h-full object-cover"
        />
        
        {/* Special Offer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center rounded-full">
          <span className="text-3xl font-bold">$250</span>
          <span className="text-sm font-medium">Special Offer</span>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100
          transition-opacity duration-200 flex items-center justify-center">
          <Edit3 size={28} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}