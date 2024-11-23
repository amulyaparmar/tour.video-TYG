import { supabase } from '@/utils/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type ScreenData = {
  title: string;
  caption?: string;
  location_card?: string;
  video?: string;
  img?: string;
  links?: Array<{
    id: string;
    name: string;
    route: string;
    video?: string;
  }>;
}

async function getMagnet(uuid: string) {
  const { data: magnet, error } = await supabase
    .from('Magnet')
    .select('*')
    .eq('uuid', uuid)
    .single();
  
  if (error) {
    console.error('Error fetching magnet:', error);
    return null;
  }
  
  return magnet;
}

async function updateScreen(magnetId: string, categoryKey: string, screenKey: string, screenData: Partial<ScreenData>) {
  const { data: magnet } = await supabase
    .from('Magnet')
    .select('magnet_details')
    .eq('uuid', magnetId)
    .single();

  if (!magnet?.magnet_details?.template?.categories?.[categoryKey]?.screens?.[screenKey]) {
    throw new Error('Screen not found');
  }

  const updatedTemplate = {
    ...magnet.magnet_details.template,
    categories: {
      ...magnet.magnet_details.template.categories,
      [categoryKey]: {
        ...magnet.magnet_details.template.categories[categoryKey],
        screens: {
          ...magnet.magnet_details.template.categories[categoryKey].screens,
          [screenKey]: {
            ...magnet.magnet_details.template.categories[categoryKey].screens[screenKey],
            ...screenData
          }
        }
      }
    }
  };

  const { error } = await supabase
    .from('Magnet')
    .update({
      magnet_details: {
        ...magnet.magnet_details,
        template: updatedTemplate
      }
    })
    .eq('uuid', magnetId);

  if (error) throw error;
}

export default async function ScreenEditPage({
  params
}: {
  params: { 
    magnet: string;
    category: string;
    screen: string;
  }
}) {
  const magnet = await getMagnet(params.magnet);
  if (!magnet) return notFound();

  const screenData = magnet.magnet_details?.template?.categories?.[params.category]?.screens?.[params.screen];
  if (!screenData) return notFound();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Edit Screen</h1>
            <p className="text-gray-600">
              {magnet.name} / {params.category} / {screenData.title}
            </p>
          </div>

          <div className="p-6 max-w-7xl mx-auto">
            {/* Header with Back Button */}
            <div className="mb-8">
              <Link 
                href={`/dashboard/${params.community}/${params.magnet}`} 
                className="inline-flex items-center text-blue-500 mb-4"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Link>
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">{screenData.title}</h1>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>

            {/* Screen Type Selection */}
            <div className="mb-8">
              <label className="block text-sm text-gray-600 mb-2">Screen Type:</label>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Video
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Form
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Embed App
                </button>
              </div>
            </div>

            {/* Video Location Card */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Video Location Card</label>
              <input
                type="text"
                defaultValue={screenData.location_card}
                placeholder="Enter location..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Video Caption */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Video Caption</label>
              <input
                type="text"
                defaultValue={screenData.caption}
                placeholder="Enter caption..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Links Section */}
            <div className="mb-8">
              <div className="flex gap-4 mb-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Links</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md">Center Links</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md">Bottom Links</button>
              </div>

              {/* Links Table */}
              <div className="bg-white rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-6 py-3">Button Name</th>
                      <th className="text-left px-6 py-3">Video Path</th>
                      <th className="text-left px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {screenData.links?.map((link, index) => (
                      <tr key={link.id} className="border-b border-gray-200">
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            defaultValue={link.name}
                            className="w-full px-3 py-1 border border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            defaultValue={link.route}
                            className="w-full px-3 py-1 border border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add New Link Section */}
              <div className="mt-4 flex gap-4">
                <input
                  type="text"
                  placeholder="Floor Plan 1"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                />
                <select className="flex-1 px-4 py-2 border border-gray-300 rounded-md">
                  <option>Floor Plan / URL</option>
                </select>
                <button className="p-2 text-blue-500 border border-gray-300 rounded-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button className="p-2 text-blue-500 border border-gray-300 rounded-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          
          <form className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    defaultValue={screenData.title}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Caption</label>
                  <input
                    type="text"
                    defaultValue={screenData.caption}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location Card Text</label>
                  <input
                    type="text"
                    defaultValue={screenData.location_card}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Media</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Video URL</label>
                  <input
                    type="url"
                    defaultValue={screenData.video}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Thumbnail Image URL</label>
                  <input
                    type="url"
                    defaultValue={screenData.img}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Navigation Links</h2>
              
              <div className="space-y-4">
                {screenData.links?.map((link, index) => (
                  <div key={link.id} className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Link Name</label>
                      <input
                        type="text"
                        defaultValue={link.name}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Route</label>
                      <input
                        type="text"
                        defaultValue={link.route}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  className="mt-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  + Add Link
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="w-[480px] sticky top-6 self-start">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Video Preview</h2>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {screenData.video ? (
                <video
                  className="w-full h-full object-cover"
                  controls
                  src={screenData.video}
                  poster={screenData.img}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No video selected
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 