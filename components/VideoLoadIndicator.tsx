import React from 'react';
import { motion } from 'framer-motion';

export function VideoLoadIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
      className="absolute bottom-8 right-8"
    >
      <div className="w-28 h-28 rounded-full border-[4px] border-white shadow-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=224&h=224&q=80" 
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}