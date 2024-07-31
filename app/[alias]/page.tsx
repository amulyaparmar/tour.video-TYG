import DynamicIframe from "./DynamicIframe";
import { supabase } from '@/utils/supabase';

export async function generateMetadata({ params, searchParams }) {

  let alias = params?.alias.replace("%40","@") || "";
  let community: any = {};
  let error = null;
  // Fetch the community data using the alias
  // if params alias includes "@" filter by alias, else if alias is just anumber, then filter by id else filter by community_magnets (supabase filter for all)
  if (alias?.includes("@")) {
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

  let ogImageUrl = `https://tour.video/api/og?id=${params?.alias?.replace("%40", "@")}${searchParams?.screen ? `&screen=${searchParams?.screen}` : ""}`;
  console.log("ogImageUrlTYG: ", ogImageUrl);

  if (error || !community) {
    return {
      data: { 
        alias: params?.alias,
        ogImage: ogImageUrl,
      },
      title: 'Community Not Found',
    };
  }

  const tour = community?.community_magnets;
  const startScreen =  searchParams?.screen ? searchParams?.get('screen') : tour?.magnet_details?.template?.default_config?.startScreen || "intro.main";
  const ogVid =  searchParams?.ogVid ? true : false;
  const initialScreenData =
    tour.magnet_details.template.categories[(startScreen).split(".")[0]].screens[
        (startScreen).split(".")[1]
    ];
  
  const videoUrl = initialScreenData?.video || "";
  const iframeEnabled = initialScreenData?.iframe?.enabled || false;

    console.log("videoUrlTYG: ", videoUrl)
  return {
    title: `Virtual Tour - ${community.name}`,
    description: `Take a virtual tour of ${community.name}`,
    openGraph: {
      title: `Virtual Tour - ${community.name}`,
      description: `Take a virtual tour of ${community.name}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
        // {
        //   url: "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1bd9561c-0fe2-4dab-52d1-a559785d4c00/original",
        //   width: 400,
        //   height: 208,
        // }
      ],
      videos: ogVid && videoUrl && !iframeEnabled ? [
        {
          url: videoUrl,
          width: 1280,
          height: 720,
          type: "video/mp4",
        },
      ] : [],
      
    },
    twitter: {
      card: 'summary_large_image',
      title: `Virtual Tour - ${community.name}`,
      description: `Take a virtual tour of ${community.name}`,
      images: [ogImageUrl],
      players: ogVid && videoUrl && !iframeEnabled ? [
        {
          playerUrl: videoUrl,
          streamUrl: videoUrl,
          width: 1280,
          height: 720,
        },
      ] : [],
    },
    
  };
}


export default function AliasPage({ params, searchParams }) {
  return (
    <DynamicIframe alias={params?.alias} initialSearchParams={searchParams} />
  );
}
