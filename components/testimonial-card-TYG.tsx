import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import Image from "next/image";

interface TestimonialCardProps {
  image: string;
  video: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, video }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <Dialog.Root>
      <motion.div
        className="relative overflow-hidden h-[100px] min-w-[200px] bg-slate-400 rounded-xl flex justify-center items-center"
        key={image}
        onHoverStart={() => setShowOverlay(true)}
        onHoverEnd={() => setShowOverlay(false)}
      >
        {/* Hover overlay */}
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              className="absolute left-0 top-0 bottom-0 right-0 z-10 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute bg-black pointer-events-none opacity-50 h-full w-full" />
              <Dialog.Trigger asChild>
                <motion.button
                  className="bg-white font-semibold text-sm z-10 px-3 py-2 rounded-full flex items-center gap-[0.5ch] hover:opacity-75"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  exit={{ y: 10 }}
                >
                  <span>Watch Video</span>
                  <img src="/images/arrow.svg" className="h-4 w-4" />
                </motion.button>
              </Dialog.Trigger>
            </motion.div>
          )}
        </AnimatePresence>
        <Image src={image} alt={image} fill style={{ objectFit: "cover" }} />
      </motion.div>

      {/* Video Modal */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl aspect-video data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <video
            src={video}
            controls
            className="w-full h-full rounded-lg"
            autoPlay
          />
          <Dialog.Close className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="text-white text-lg">×</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TestimonialCard;