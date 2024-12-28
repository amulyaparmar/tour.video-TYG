import React from 'react';
import { supabase } from '@/utils/supabase';

export async function generateMetadata({params, searchParams}) {

  // The base64 encoded string
const v = params?.v.replaceAll("%3D","") || "";

// Decode the base64 string
const decodedString = atob(v);

// Parse the JSON string
const jsonObject = JSON.parse(decodedString);

console.log(jsonObject);

// Extract the URL from the JSON object
const url = jsonObject.url;

// Extract the date part from the URL using a regular expression
const dateMatch = url.match(/\/(\d{8})\//);
let formattedDate = ""
if (dateMatch) {
  // The date string in YYYYMMDD format
  const dateString = dateMatch[1];
  
  // Parse the date string
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  
  // Create a JavaScript Date object
  const date = new Date(year, month - 1, day); // Note: month is 0-indexed
  
  // Format the date as needed (e.g., YYYY-MM-DD)
  formattedDate = `${month}-${day}-${year}`;
  
  console.log(`Extracted date: ${formattedDate}`); // Outputs: "Extracted date: 2024-07-31"
} else {
  console.log("No date found in the URL.");
}


  return {
    title: `Tour.video Recording ${formattedDate ? `- ${formattedDate}` : ""}`,
    description: `Take a virtual tour of our sample work`,
    openGraph: {
      title: `Tour.video Recording ${formattedDate ? `- ${formattedDate}` : ""}`,
      description: `Explore our recording virtually!`,
      images: [
        {
          url: "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1bd9561c-0fe2-4dab-52d1-a559785d4c00/original",
          width: 400,
          height: 208,
        }
      ],
      videos: [
        {
          url: jsonObject?.url,
          width: 1280,
          height: 720,
          type: "video/mp4",
        },
      ],
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: `Tour.video & LeaseMagnets - A few of our Community Tours`,
    //   description: `Explore our community tours virtually!`,
      
    // },
    twitter: {
      card: 'player',
      // site: '@site',
      // creator: '@creator',
      title: `Tour.video Recording ${formattedDate ? `- ${formattedDate}` : ""}`,
      images: [
        "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1bd9561c-0fe2-4dab-52d1-a559785d4c00/original",
      ],
      players: [
        {
          playerUrl: jsonObject?.url,
          streamUrl: jsonObject?.url,
          width: 1280,
          height: 720,
        },
      ],
    },
    
  };
}

export default function AliasPage({ params, searchParams }) {
  // useEffect(() => {
  //   // Create and append the script element for the Tour widget
  //   const script = document.createElement('script');
  //   script.src = 'https://new-videomagnet-658y.onrender.com/lease-magnet.umd.js';
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
