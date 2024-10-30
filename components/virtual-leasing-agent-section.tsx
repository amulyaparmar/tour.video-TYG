'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Home, MessageSquare,PlayCircle } from "lucide-react"
import "./videoPopup.css"

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


  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            You're not alone.
          </h2>
          <p className="text-xl text-gray-600">
            We've helped 130+ property managers close deals while they sleep.
          </p>
        </div>
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">The Secret Sauce 🤫</h3>


          <div className="flex items-center justify-center flex-col">
            <h6 className="pt-10 w-full text-center text-lg font-medium text-gray-800">
              Customers Stories
            </h6>
            <h1 className="text-4xl font-bold text-gray-800 w-full text-center pt-2">
              What our partners are saying
            </h1>
            {/* Infinite scrolling cards */}
            <div className="infinite-carousel w-full flex">
              <div className="infinite-carousel-wrapper">
                {videoData.map((video, index) => (
                  <VideoCard key={index} video={video} onPlay={openPopup} />
                ))}
              </div>
            </div>

          </div>
          <div className="grid md:grid-cols-3 gap-8">

            
            <Card>
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-blue-500 mb-4" />
                <h4 className="text-xl font-semibold mb-2">24/7 Virtual Agent</h4>
                <p className="text-gray-600">
                  Your top performer, cloned and working round the clock. No coffee breaks needed. (75% more qualified leads than traditional tours)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Home className="w-12 h-12 text-blue-500 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Remote Closing Machine</h4>
                <p className="text-gray-600">
                  Run tours from your couch. Or beach. Or wherever. Close 25% more deals without putting on real pants.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <MessageSquare className="w-12 h-12 text-blue-500 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Smart Follow-ups That Actually Work</h4>
                <p className="text-gray-600">
                  None of that "just checking in" nonsense. Share personalized tours that make prospects think "take my money already."
                </p>
              </CardContent>
            </Card>
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
          <Button size="lg" className="text-lg px-8">
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