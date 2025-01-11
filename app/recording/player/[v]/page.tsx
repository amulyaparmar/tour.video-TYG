"use client"
import React, { useEffect } from 'react';
import { supabase } from '@/utils/supabase';

// export async function generateMetadata() {
//   return {
//     title: `Tour.video - Sample Work`,
//     description: `Take a virtual tour of our sample work`,
//     openGraph: {
//       title: `Tour.video & LeaseMagnets - A few of our Community Tours`,
//       description: `Explore our community tours virtually!`,
//       images: [
//         {
//           url: "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1bd9561c-0fe2-4dab-52d1-a559785d4c00/original",
//           width: 400,
//           height: 208,
//         }
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: `Tour.video & LeaseMagnets - A few of our Community Tours`,
//       description: `Explore our community tours virtually!`,
//       images: [
//         "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1bd9561c-0fe2-4dab-52d1-a559785d4c00/original",
//       ],
//     },
//   };
// }

export default function AliasPage({ params, searchParams }) {
  // useEffect(() => {
  //   // Create and append the script element for the Tour widget
  //   const script = document.createElement('script');
  //   script.src = 'https://new-videomagnet.onrender.com/lease-magnet.umd.js';
  //   script.async = true;
    
  //   // Initialize the widget once the script loads
  //   script.onload = () => {
  //     if (window.Tour) {
  //       window.Tour({
  //         uuid: '@reflectionatlanta',
  //         showButton: 'true',
  //         desktopWidth: 60,
  //         // captureLeadAfter: '10',
  //         // aspectRatio: '1.55',
  //         backgroundOpacity: '70',
  //         showAccessoryButtons: 'false',
  //         primaryColor:"#4158d0",
  //         color:"#4158d0",
  //         // screen: "intro.intro_video_2"
  //       });
  //     }
  //   };

  //   // Append the script to the document body
  //   document.body.appendChild(script);

  //   // Cleanup: Remove the script when the component unmounts
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <>
      <div className="relative w-full h-screen">
        <iframe 
          src={`https://player.getcontrast.io/watch?v=${params?.v.replaceAll("%3D","")}`} 
          title="Virtual Tour of our Recording TYG"
          className="w-full h-full border-none"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div id="tour-widget-container" className="w-full h-96 mt-4">
        {/* The Tour widget will be inserted here */}
      </div>
    </>
  );
}
