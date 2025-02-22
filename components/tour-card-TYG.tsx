import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

import Arrow from "@public/images/arrow.svg";
import Image from "next/image";

interface TourCardProps {
  image: string;
  item: any;
}

const TourCard: React.FC<TourCardProps> = ({ image, item }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [offset, setOffset] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const isInCenterRange = offset > -40 && offset < 150;

  useEffect(() => {
    const checkOffset = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const windowCenter = window.innerWidth / 2;
        const cardCenter = rect.left + rect.width / 2;
        setOffset(Math.round(cardCenter - windowCenter));
      }
    };

    const interval = setInterval(checkOffset, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden h-[200px] min-w-[200px] bg-slate-400 rounded-xl flex justify-center items-center"
      key={image}
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-blue-500 text-white px-2 py-1 rounded">
        {offset}px
      </div> */}

      <AnimatePresence>
        {(showOverlay || isInCenterRange) && (
          <motion.div
            className="absolute left-0 top-0 bottom-0 right-0 z-10 flex flex-col justify-center items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute bg-black pointer-events-none opacity-50 h-full w-full" />
            
            {/* Agent Image */}
            {item.agent && (
              <motion.div
                className="z-10 w-12 h-12 rounded-full overflow-hidden border-2 border-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Image
                  src={item.agent}
                  alt="Agent"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </motion.div>
            )}

            {/* Caption */}
            {item.caption && (
              <motion.p
                className="text-white text-sm z-10 text-center px-2"
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 5, opacity: 0 }}
              >
                {item.caption}
              </motion.p>
            )}

            {/* Explore Now Button */}
            <motion.button
              className="bg-white font-semibold text-sm z-10 px-3 py-2 rounded-full flex items-center gap-[0.5ch] hover:opacity-75"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
            >
              <span>Build Tour</span>
              <img src="/images/arrow.svg" className="h-4 w-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <Image src={image} alt={image} fill style={{ objectFit: "cover" }} />
    </motion.div>
  );
};

export default TourCard;