import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import {AppSidebar} from '../../../components/sidebar-menu'
import { redirect } from 'next/navigation';

type Magnet = {
  uuid: string;
  name: string;
  community_id: number;
  created_at: string;
  integration_details: any;
  magnet_details: any;
  magnet_type: string;
  cache: any;
  alias: string;
  logo: string;
}

export async function generateMetadata() {
  return {
    title: `Tour.video - Magnets`,
    description: `View all available magnets`,
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

async function getMagnets(communityId: string) {
  const { data: magnets, error } = await supabase
    .from('Magnet')
    .select('*')
    .eq('community_id', communityId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching magnets:', error);
    return [];
  }
  return magnets as Magnet[];
}

export default async function DashboardPage({
  params
}: {
  params: { community: string }
}) {
  const magnets = await getMagnets(params.community);

  if (magnets.length > 0) {
    redirect(`/dashboard/${params.community}/${magnets?.[0]?.uuid}`);
  }

  return (
    <>
    <div className="p-6">
    <div className="flex justify-between items-center mb-8">
        <div className="relative flex-1 max-w-xl">
          <input
            type="search"
            placeholder="Search communities..."
            className="w-full px-4 py-2 rounded-lg border border-gray-200"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Magnets for Community {params.community} ({magnets.length})</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          + Add New Community
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {magnets.map((magnet) => (
          <div 
            key={magnet.uuid} 
            className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <Link href={`/dashboard/${params.community}/${magnet.uuid}`} prefetch={true}>
                <img
                  src={magnet.logo || '/placeholder.jpg'}
                  alt={magnet.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    View Details
                  </button>
                </div>
              </Link>
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1 hover:text-blue-600 transition-colors">
                {magnet.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Type: {magnet.magnet_type}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Created: {new Date(magnet.created_at).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-3">
                {['Edit', 'Preview', 'Settings'].map((action) => (
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
    </>
  );
}
