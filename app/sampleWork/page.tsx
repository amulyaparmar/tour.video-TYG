import { supabase } from '@/utils/supabase';

export async function generateMetadata({ }) {

  return {
    title: `Tour.video - Sample Work`,
    description: `Take a virtual tour of our sample work`,
    openGraph: {
      title: `Tour.video & LeaseMagnets - A few of our Community Tours`,
      description: `Take a virtual tour today!`,
      images: [
        {
          url: "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1bd9561c-0fe2-4dab-52d1-a559785d4c00/original",
          width: 400,
          height: 208,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Tour.video & LeaseMagnets - A few of our Community Tours`,
      description: `Take a virtual tour!`,
      images: "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1bd9561c-0fe2-4dab-52d1-a559785d4c00/original",
    },
  };
}


export default function AliasPage({ params, searchParams }) {
  return (
    <>
      <div className="relative w-full h-screen">
        <iframe 
          src="https://aligntheshot.com/work" 
          className="w-full h-full border-none"
        />
        <div className="absolute top-0 left-0 right-0 h-[150px] bg-black z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-black z-10" />
      </div>
    </>
  );
}
