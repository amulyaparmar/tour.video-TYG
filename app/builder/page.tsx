import { ChatbotBuilderComponent } from "@/components/chatbot-builder";

export async function generateMetadata({ params, searchParams }) {

  return {
    title: `Virtual Tour `,
    description: `Take a virtual tour`,
    openGraph: {
      title: `Virtual Tour `,
      description: `Take a virtual tour of`,
      images: [
        {
          url: "",
          width: 1200,
          height: 630,
        },
        // {
        //   url: "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1bd9561c-0fe2-4dab-52d1-a559785d4c00/original",
        //   width: 400,
        //   height: 208,
        // }
      ],
      videos: false ? [
        {
          url: "",
          width: 1280,
          height: 720,
          type: "video/mp4",
        },
      ] : [],
      
    },
    twitter: {
      card: 'summary_large_image',
      title: `Virtual Tour `,
      description: `Take a virtual tour `,
      images: [],
      players: false ? [
        {
          playerUrl: "",
          streamUrl: "",
          width: 1280,
          height: 720,
        },
      ] : [],
    },
    
  };
}

// Loader component
const Loader = () => (
  <svg className="animate-spin h-16 w-16 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);


export default function BuilderPageTYG({ }) {
  return (
   <ChatbotBuilderComponent />
  );
}
