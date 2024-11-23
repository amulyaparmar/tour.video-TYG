import { supabase } from '@/utils/supabase';
import Link from 'next/link';

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

async function getCommunities() {
  const { data: communities, error } = await supabase
    .from('Community')
    .select('*')
    .eq('hidden', false);
  
  if (error) {
    console.error('Error fetching communities:', error);
    return [];
  }
  return communities;
}

export default async function DashboardPage() {
  const communities = await getCommunities();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Communities ({communities.length})</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          + Add New Community 
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {communities.map((community) => (
          <div 
            key={community.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <Link href={`/dashboard/${community.id}`}>
                <img
                  src={community.img_url || '/placeholder.jpg'}
                  alt={community.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    View Tour
                  </span>
                </div>
              </Link>
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1 hover:text-blue-600 transition-colors">
                {community.name}
              </h2>
              <a 
                href={community.url} 
                className="text-sm text-gray-600 hover:text-blue-500 transition-colors truncate block"
                target="_blank"
                rel="noopener noreferrer"
              >
                {community.url}
              </a>
              <div className="flex gap-2 mt-3">
                {['Videos', 'Manage', 'Settings'].map((action) => (
                  <button 
                    key={action}
                    className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
