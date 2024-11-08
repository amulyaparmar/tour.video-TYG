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
    let finalPosition = -width - 8;

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
            <a href="#features">
              <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Features
              </Button>
            </a>
            <a href="#case-studies">
              <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Case Studies
              </Button>
            </a>
            <a href="https://app.usetour.com/book-demo">
              <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Book Demo
              </Button>
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://app.usetour.com/signin">
            <Button variant="outline">Log In</Button>
          </a>
          <a href="https://app.usetour.com/signup">
            <Button>Sign Up</Button>
          </a>
        </div>
      </header>
      <main className="flex-1">        
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="relative text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="inline-block mb-2">
                👋 meet your virtual leasing agent.
              </span>
              <br />
              <span className="relative inline-flex items-center justify-center">
                get your apartment
                <span className="relative mx-3 px-6 py-1 bg-blue-500 text-white rounded-lg transform -skew-x-6">
                  more leases
                </span>
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              If your Tour is your best sales asset, why not deliver it to every website visitor?
              <span className="block mt-2 font-medium text-blue-600">
                Drive 75% more pre-qualified leads & scheduled appointments with our VLA.
              </span>
            </p>
            <a 
              href="https://app.usetour.com/signup" 
              target="_blank"
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200">
                <Button className="relative mt-10 px-8 py-4 text-lg bg-black text-white hover:bg-gray-900 transition-all duration-200" size="lg">
                  Sign Up - It's Free!
                </Button>
              </div>
            </a>
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
        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-500" />
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                  Deliver 4x more tours and create pre-qualified leads
                </div>
                <a href="https://app.usetour.com/signup">
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">
                    Get Started Now
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-6 border rounded-lg p-4">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0.5, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full aspect-video  rounded-lg"
                >
                  <video
                    className="w-[102%] h-full object-cover transform -translate-x-[1%] rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1953e9da-c870-4d2e-8ed6-cd8c6077b000/400pxHeight"
                  >
                    <source src="https://customer-qqdk2u3dbwgfurzm.cloudflarestream.com/8de62a72aa05af492c00486f566e0e91/downloads/default.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>

                <motion.img
                  src="https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/7aebb46c-0c32-4129-fe61-554926020500/big"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.6, duration: 0.4 }}
                  className="absolute -right-[100px] border shadow-lg border-blue-100 rounded-lg bottom-[-75px] -translate-y-1/2 h-[400px] object-contain"
                  alt="Decorative element"
                />

                <motion.img
                  src="https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/37b4fffc-0749-4bc5-5899-462958dd3600/big"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.2, duration: 0.4 }}
                  className="absolute left-[-60px] border shadow-lg border-blue-100/20 rounded-xl bottom-[-60px] -translate-y-1/2 h-[130px] object-contain"
                  alt="Decorative element"
                />
                 <motion.img
                  src="https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/90ddfdc6-db1f-4e86-bf8c-9c4c5d0db400/big"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.4, duration: 0.4 }}
                  className="absolute left-[-88px] border shadow-lg border-blue-100 rounded-lg bottom-[-50px] -translate-y-1/2 h-[25px] object-contain"
                  alt="Decorative element"
                />

              </div>
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
        <div id="features">
          <FeatureOverview />
        </div>
        <div id="case-studies">
          <MissionStatement />
        </div>
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
              {[...tourExamplesTYG, ...tourExamplesTYG.slice(2,-1)].map((item, idx) => (
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