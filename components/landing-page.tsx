'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, Search, Zap, Video, MessageCircle, Bot, PlaySquare } from "lucide-react"
import Image from "next/image"
import { JobMatchesSection } from "./job-matches-section"
import { VirtualLeasingAgentSection } from "./virtual-leasing-agent-section"
import { FeatureSections } from "./feature-sections"
import { FeatureOverview } from "./feature-overview"
import { MissionStatement } from "./mission-statement"
import { TestimonialSection } from "./testimonial-section"
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import TourCard from "./tour-card-TYG"
import tourExamplesTYG from "./tour-examples-TYG"

export function LandingPage() {
  
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
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <div className="flex items-center space-x-6">
          <div style={{height:"30px"}}>
            <Image
              src="/images/tour logo TYG.svg"
              alt="Company Logo"
              width={142}
              height={54}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              priority
            />
          </div>
          <nav className="hidden md:flex space-x-4">
            <a className="text-sm font-medium text-gray-600 hover:text-gray-900" href="#">
              Features
            </a>
            <a className="text-sm font-medium text-gray-600 hover:text-gray-900" href="#">
              Case Studies
            </a>
            {/* <a className="text-sm font-medium text-gray-600 hover:text-gray-900" href="#">
              Tour Generator
            </a> */}
            <a className="text-sm font-medium text-gray-600 hover:text-gray-900" href="#">
              Book Demo
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </header>
      <main className="flex-1">        
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              👋 meet your virtual leasing agent.
              <br />
              get your apartment more leases
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              If your Tour is your best sales asset, why not deliver it to every website visitor?
              Drive 75% more pre-qualified leads & scheduled appointments with our VLA.
            </p>
            <Button className="mt-8 px-8 py-3 text-lg bg-black text-white" size="lg">
              Sign Up - It's Free!
            </Button>
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">Join the 130+ property managers who use Tour to deliver 1.1M tours and counting</span>
            </div>
          </div>
        </section>
        <Tabs defaultValue="interactive-video-tours" className="mt-12">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="interactive-video-tours">
              <Video className="w-4 h-4 mr-2" />
              Video Tours
            </TabsTrigger>
            <TabsTrigger value="proactive-questions">
              <MessageCircle className="w-4 h-4 mr-2" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="ai-followups">
              <Bot className="w-4 h-4 mr-2" />
              AI Followups
            </TabsTrigger>
            <TabsTrigger value="programmatic-video-ads">
              <PlaySquare className="w-4 h-4 mr-2" />
              Video Ads
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-500" />
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                Deliver 4x more tours and create pre-qualified leads
              </div>
            </div>
            <div className="mt-6 border rounded-lg p-4">
              {/* <Image
                src="/placeholder.svg?height=60&width=60"
                alt="Airbnb logo"
                className="w-16 h-16"
                width={60}
                height={60}
              /> */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full aspect-video overflow-hidden rounded-lg"
                >
                  <video
                    className="w-[102%] h-full object-cover transform -translate-x-[1%] rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="https://customer-qqdk2u3dbwgfurzm.cloudflarestream.com/8de62a72aa05af492c00486f566e0e91/downloads/default.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              {/* place a video here that takes full screen, rounded corners, crop in it on the sides left and right by a few pixels , and add strong dropshadow and even stronger dropshadow on hover, and add framer motion on scroll fade in up 
            */}
            </div>
          </div>
        </div>
        <div className="mt-16 text-center w-full overflow-hidden">
          <h2 className="text-3xl font-bold">
            We help guide the best: <span className="text-blue-500">1.089.1 k</span> tours and counting
          </h2>
          <div className="mt-8 flex justify-center items-center space-x-8 mb-10 w-full">
            {[
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/4b8dd8f0-9fc8-4751-68ed-14e7e7b34e00/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/acad94c4-031f-4cdf-8712-71bd264a9900/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/04a2628b-79e1-477e-806f-0911847a4500/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/8045d40f-3b50-4472-e585-91e163ce8200/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/12569d4b-2e95-4740-334d-a32400c2bc00/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/dca38d07-055b-4cac-c758-6c87818ed400/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/8588060c-4220-4c9c-2178-18c16a066f00/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/c52d07bf-aff1-4115-a907-ed002d49f200/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/2df2a608-c3f6-4313-e8f3-888f739a9d00/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/2d2dc7b0-5817-4cef-ce44-d4305b07fb00/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/2ea094cc-86d3-4bfc-2840-7c48dfbef400/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1773f5ba-7d3f-45d0-f446-c7db12583200/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/d121e07e-f0d3-4e1f-ae43-6d31a83ee400/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/6cfd16ea-9511-4955-fb2d-2d0d4e531100/original",
    "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/7f06e111-e718-494a-59c7-912f58b4f400/original"
].splice(7).map((pic, i) => (
              <Image
                key={i}
                src={pic}
                alt={`Company logo ${i + 1}`}
                width={120}
                height={40}
                className="h-8 w-auto object-contain filter grayscale opacity-50"
              />
            ))}
          </div>
        </div>
        {/* <JobMatchesSection /> */}
        <VirtualLeasingAgentSection />
        {/* <FeatureSections /> */}
        <FeatureOverview />
        <MissionStatement />
        {/* <TestimonialSection /> */}

        <div className="overflow-hidden">
          <motion.div
              className="left-0 flex gap-4 mb-10"
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
              {[...tourExamplesTYG, ...tourExamplesTYG].map((item, idx) => (
                <TourCard item={item} image={`${item?.cover}`} key={idx} />
              ))}
          </motion.div>
        </div>




      </main>
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <Image
                src="/images/tour logo TYG dark.svg"
                alt="Company Logo"
                width={100}
                height={30}
                className="h-12 w-auto"
              />
            </div>
            <div className="w-full md:w-3/4 flex flex-wrap justify-end">
              <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-gray-300">Features</a></li>
                  <li><a href="#" className="hover:text-gray-300">Pricing</a></li>
                  <li><a href="#" className="hover:text-gray-300">Case Studies</a></li>
                  <li><a href="#" className="hover:text-gray-300">Tour Generator</a></li>
                </ul>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold  mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-gray-300">About Us</a></li>
                  <li><a href="#" className="hover:text-gray-300">Careers</a></li>
                  <li><a href="#" className="hover:text-gray-300">Contact</a></li>
                  <li><a href="#" className="hover:text-gray-300">Blog</a></li>
                </ul>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-gray-300">Help Center</a></li>
                  <li><a href="#" className="hover:text-gray-300">FAQs</a></li>
                  <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            <p>&copy; 2024 UseTour.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}