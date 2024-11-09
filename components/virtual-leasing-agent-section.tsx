'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Home, MessageSquare,PlayCircle } from "lucide-react"
import "./videoPopup.css"
import { animate, motion, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import TourCard from "./tour-card-TYG"
import TestimonialCard from "./testimonial-card-TYG";


const videoData = [
  {
    id: 1,
    src: 'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com//testmonials/essentials_t.mp4',
    title: 'The Essential',
    img: 'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com//testmonials/essentials_testimonials.png'
  },
  {
    id: 2,
    src: 'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com//testmonials/peak_made.mp4',
    title: 'PeakMade',
    img: 'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com//testmonials/peakmade_testimonials.png'
  },
  {
    id: 3,
    src: 'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com//testmonials/Quad_real_estate.mp4',
    title: 'Quad Real Estate',
    img: 'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com//testmonials/Quad_realestate_v2.png'
  },
  {
    id: 4,
    src: 'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com//testmonials/CLS.mp4',
    title: 'Campus Life & Style',
    img: 'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com//testmonials/cls_v2.png'
  },
  {
    id: 5,
    src: 'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com//testmonials/caliber_living.mp4',
    title: 'Caliber Living',
    img: 'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com//testmonials/calibar_living_v2.png'
  },
  {
    id: 6,
    src: 'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com//testmonials/GMH.mp4',
    title: 'GMH',
    img: 'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com//testmonials/GMH_v2.png'
  },
 
  // Add more video objects here
];

const VideoCard = ({ video, onPlay }) => (
  <div className="video-card" onClick={() => onPlay(video.src)}>
    <img 
    style={{width : '450px', height : '250px'}}
    width={"550px"} height={'450px'} src={video.img} alt={video.title} className="video-thumbnail" />
    <div className="play-button">
      <PlayCircle size={64} color="white" />
    </div>
    <h4>{video.title}</h4>
  </div>
);

const VideoPopup = ({ videoSrc, onClose }) => (
  <div className="video-popup">
    <div className="video-popup-content">
      <span className="close-button" onClick={onClose}>
        &times;
      </span>
      <video src={videoSrc} controls autoPlay className="popup-video" />
    </div>
  </div>
);



export function VirtualLeasingAgentSection() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  const openPopup = (videoSrc) => {
    setCurrentVideo(videoSrc);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentVideo('');
  };

  const FAST_DURATION = 25;
  const SLOW_DURATION = 75;

  const [duration, setDuration] = useState(FAST_DURATION);
  let [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [rerender, xTranslation, duration, width]);



  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h6 className="pt-10 w-full text-center text-lg font-medium text-gray-800">
              Customers Stories
            </h6>
            <h1 className="text-4xl font-bold text-gray-800 w-full text-center pt-2">
              Why our 130+ partners love us
            </h1>
          <h2 className="text-4xl font-bold mb-4">
            You're not alone.
          </h2>
          <p className="text-xl text-gray-600">
            We've helped 130+ property managers close deals while they sleep.
          </p>
        </div>
        <div className="mb-16">


          <div className="flex items-center justify-center flex-col">
            
            {/* Infinite scrolling cards */}
            {/* <div className="infinite-carousel w-full flex">
              <div className="infinite-carousel-wrapper">
                {videoData.map((video, index) => (
                  <VideoCard key={index} video={video} onPlay={openPopup} />
                ))}
              </div>
            </div> */}

          </div>

          <div className="overflow-hidden">
            <motion.div
                className="left-0 flex gap-4"
                style={{ x: xTranslation }}
                ref={ref}
                onHoverStart={() => {
                  setMustFinish(true);
                  setDuration(SLOW_DURATION);
                }}
                onHoverEnd={() => {
                  setMustFinish(true);
                  setDuration(FAST_DURATION);
                }}
              >
                {[...videoData, ...videoData].map((item, idx) => (
                  <TestimonialCard image={`${item?.img}`} video={item?.src} key={idx} />
                ))}
            </motion.div>
          </div>


        </div>
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-8">The Numbers Don't Lie</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-blue-500">1,100,000+</p>
              <p className="text-xl">tours delivered</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-500">130+</p>
              <p className="text-xl">property managers crushing it</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-500">$0</p>
              <p className="text-xl">to get started (30-day free test drive)</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button size="lg" className="text-lg px-8 bg-black text-white">
            Book a 15-min Demo →
          </Button>
          <p className="mt-4 text-sm text-gray-600 italic">
            (Warning: May cause severe FOMO in competitors)
          </p>
        </div>
      </div>
    </section>
  )
}