import React from 'react';
import { motion } from 'framer-motion';
import { Edit3 } from 'lucide-react';
import { useMagnetStore } from '@/store/useMagnetStore';

export function VideoOrb({ startScreenObject }: { startScreenObject: any }) {
  const { magnet } = useMagnetStore();
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
        <video 
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={startScreenObject.img || startScreenObject.gif}
        >
          <source src={`${startScreenObject.video}#t=4`} type="video/mp4" />
        </video>
        
        {/* Special Offer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center rounded-full">
          {/* <span className="text-3xl font-bold">$250</span> */}
          <span className="text-lg font-medium">{magnet?.magnet_details?.template?.default_config?.buttonLabel || "Take a Virtual Tour"}</span>
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