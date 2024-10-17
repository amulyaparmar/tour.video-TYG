import { ImageResponse } from '@vercel/og';
import { supabase } from '@/utils/supabase';

// export const runtime = "experimental-edge"

const plusJakartaSansMedium = await fetch(
  'https://fonts.gstatic.com/s/plusjakartasans/v7/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KU7NShXUEKi4Rw.ttf'
).then((res) => res.arrayBuffer());

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  let alias =  searchParams.get('id');
  // const { searchParams } = new URL(request.url);

  const fontMedium =  await plusJakartaSansMedium;

  // const { data, error } = await supabase
  //   .from('Community')
  //   .select('name, img_url')
  //   .eq('id', alias)
  //   .single();

    let community: any = {};
    let error = null;
  
    if (alias.includes("@")) {
      alias = alias.replace("@", "");
      const { data: tempCommunity, error: tempError } = await supabase
        .from('Community')
        .select('id, name, img_url, community_magnets(*)')
        .eq('alias', alias )
        // get all the community_magnets child elements too
        .single();
      community = tempCommunity;
      error = tempError;
  
    } else if (!alias?.includes("-") && parseInt(alias)) {
      // alias is id
      const { data: tempCommunity,  error: tempError } = await supabase
        .from('Community')
        .select('id, name, img_url, community_magnets(*)')
        .eq('id', alias )
        // get all the community_magnets child elements too
        .single();
      community = tempCommunity;
      error = tempError;
  
    } else {
      // alias is uuid
      const { data: tempCommunity,  error: tempError } = await supabase
        .from('Community')
        .select('id, name, img_url, community_magnets(*)')
        .eq('community_magnets', alias )
        // get all the community_magnets child elements too
        .single();
      community = tempCommunity;
      error = tempError;
    }
  
    console.log("communityTYG: ", community);


  const tour = community?.community_magnets;
  const startScreen =  searchParams.get('screen') || tour?.magnet_details?.template?.default_config?.startScreen || "intro.main";
  const initialScreenData =
    tour.magnet_details.template.categories[(startScreen).split(".")[0]].screens[
        (startScreen).split(".")[1]
    ];
  // console.log({ initialScreenData });
  const isGif =  searchParams.get('gif') || false;

  const { name: communityName, img_url } = community;
  const imageUrl = initialScreenData?.img ||img_url || "";
  const imageGif = initialScreenData?.gif ||img_url || "";
  const screenTitle = initialScreenData?.title || "TYG";

  
  function flattenData(data) {
    const flattened = {};
  
    // Iterate over each category at the top level (e.g., "amenities", "floor_plans")
    Object.keys(data).forEach(categoryKey => {
      const category = data[categoryKey];
      
      if (category && category.screens) {
        const screens = category.screens;
  
        // Iterate over each screen in the current category
        Object.keys(screens).forEach(screenKey => {
          const screen = screens[screenKey];
          
          // Build flattened structure
          flattened[`${categoryKey}.${screenKey}`] = {
            title: screen.title || '',
            video: screen.video || '',
            img: screen?.img || '',
            gif: screen.gif || '',
            iframe: screen?.iframe?.enabled ? screen?.iframe?.src : '',

          };
        });
      }
    });
  
    return flattened;
  }
  

  // return json of all the screens
  return new Response(JSON.stringify(flattenData(tour.magnet_details.template.categories)), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400', // Cache for 1 day
    },
  });

}