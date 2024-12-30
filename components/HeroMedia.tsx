import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Share } from 'lucide-react';
import { ShareModal } from './ShareModal';
import { VideoOrb } from './VideoOrb';
import { BrowserWindow } from './BrowserWindow';
import { useMagnetStore } from '@/store/useMagnetStore';

export function HeroMedia() {
  const { startScreenObject } = useMagnetStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <BrowserWindow>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative group"
      >
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="w-full object-cover aspect-[4/3]"
        >
          <source 
            src={startScreenObject?.video}
            // src={startScreenObject?.video_url || "https://www.sample-videos.com/video321/mp4/480/big_buck_bunny_480p_20mb.mp4"}
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />
        
        {/* Play Button - Moved to bottom left */}
        <div className="absolute bottom-8 left-8">
          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white 
              transition-all duration-200 transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause size={24} className="text-blue-600" />
            ) : (
              <Play size={24} className="text-blue-600 translate-x-0.5" />
            )}
          </button>
        </div>

        <button
          onClick={() => setShowShareModal(true)}
          className="absolute top-4 right-4 p-2.5 rounded-lg bg-gray-800/80 backdrop-blur-sm shadow-lg 
            hover:bg-gray-800 transition-all duration-200 opacity-100"
        >
          <Share size={20} className="text-white" />
        </button>

        {/* {isVideoLoaded && <VideoOrb />} */}
        <VideoOrb startScreenObject={startScreenObject} />
        
        <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
      </motion.div>
    </BrowserWindow>
  );
}