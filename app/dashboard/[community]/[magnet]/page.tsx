'use client'

import { supabase } from '@/utils/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ActionTabs from '../../../../components/ActionTabs'
import { TopBar } from '@/components/TopBar/TopBar';

type Screen = {
  key: string;
  categoryKey: string;
  title: string;
  thumbnail?: string;
  views?: number;
  url?: string;
}

type CategoryData = {
  title: string;
  screens: Screen[];
}

type Magnet = {
  uuid: string;
  name: string;
  magnet_details: {
    template: {
      category_keys: string[];
      categories: {
        [key: string]: {
          title: string;
          screen_keys: string[];
          screens: {
            [key: string]: Screen;
          };
        };
      };
    };
  };
}

function extractTemplateData(magnet_details: any) {
  console.log('Processing magnet_details:', magnet_details);
  
  if (!magnet_details?.template) {
    console.log('No template found in magnet_details');
    return {
      categories: [],
      screensByCategory: {}
    };
  }

  const template = magnet_details.template;
  const categories = template.category_keys || [];
  const screensByCategory: Record<string, CategoryData> = {};
  
  console.log('Found categories:', categories);

  categories.forEach(categoryKey => {
    const category = template.categories[categoryKey];
    const screenKeys = category.screen_keys || [];
    
    console.log(`Processing category ${categoryKey}:`, category);
    console.log(`Screen keys for ${categoryKey}:`, screenKeys);

    const screens = screenKeys.map(screenKey => {
      const screen = category.screens[screenKey];
      return {
        ...screen,
        key: screenKey,
        categoryKey: categoryKey
      };
    });
    
    screensByCategory[categoryKey] = {
      title: category.title,
      screens: screens
    };
  });

  return {
    categories,
    screensByCategory
  };
}

async function getMagnet(uuid: string) {
  console.log('Fetching magnet with UUID:', uuid);
  
  const { data: magnet, error } = await supabase
    .from('Magnet')
    .select('*')
    .eq('uuid', uuid)
    .single();
  
  if (error) {
    console.error('Error fetching magnet:', error);
    return null;
  }
  
  console.log('Retrieved magnet:', magnet);
  return magnet as Magnet;
}

export default async function ContentLibraryPage({
  params
}: {
  params: { magnet: string; community: string }
}) {
  console.log('Rendering page with params:', params);
  
  const magnet = await getMagnet(params.magnet);
  
  if (!magnet) return notFound();

  const { categories, screensByCategory } = extractTemplateData(magnet.magnet_details);
  
  console.log('Processed template data:', { categories, screensByCategory });

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
        <div className="p-6 max-w-7xl mx-auto">
          {/* Magnet Title */}
          <div className="mb-8">
          <h1 className="text-3xl font-bold">{magnet.name}</h1>
          <p className="text-gray-600">Content Library</p>
        </div>

        {/* Search and Add Category Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative flex-1 max-w-xl">
            <input
              type="search"
              placeholder="Search for your videos"
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
            />
          </div>
          <button className="ml-4 px-4 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50">
            + Add Category
          </button>
        </div>

        {/** Button */}
        <ActionTabs />

        {/* Content Sections */}
        {categories.map((categoryKey) => {
          const categoryData = screensByCategory[categoryKey];
          return (
            <section key={categoryKey} className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-semibold">{categoryData.title}</h2>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Create New Card */}
                <div className="aspect-video bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-gray-100 transition-colors">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">Create New</span>
                  </div>
                </div>

                {/* Screen Items */}
                {categoryData.screens.map((screen) => (
                  <Link
                    key={screen.key}
                    href={`/dashboard/${params.community}/${params.magnet}/${screen.categoryKey}/${screen.key}`}
                    prefetch={true}
                  >
                    <div className="group cursor-pointer relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={screen?.img || '/placeholder.jpg'} 
                        alt={screen?.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/20 to-transparent">
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="font-medium text-lg">{screen?.title}</h3>
                          {screen?.views && (
                            <p className="text-sm opacity-75">Views: {screen.views}</p>
                          )}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
