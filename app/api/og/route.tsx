import { ImageResponse } from '@vercel/og';
import { supabase } from '@/utils/supabase';

// export const runtime = "experimental-edge"

const plusJakartaSansMedium = await fetch(
  'https://fonts.gstatic.com/s/plusjakartasans/v7/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KU7NShXUEKi4Rw.ttf'
).then((res) => res.arrayBuffer());

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  let alias =  searchParams?.get('id');
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

  const { name: communityName, img_url } = community;
  const imageUrl = initialScreenData?.img ||img_url || "";

  if (error) {
    return new Response('Community not found', { status: 404 });
  }
  function removeWordBeforeDash(str) {
    return str.replace(/^.*\w+\s*-\s*/, '');
  }


  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${imageUrl})`,
          // backgroundSize: 'cover',
          backgroundSize: "100% 100%",
          backgroundPosition: 'center',
          color: 'white',
          padding: '50px',
          textAlign: 'center',
          position: 'relative',
          fontFamily: '"Plus Jakarta Sans"',
        }}
      >

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(0,0,0,1.0), rgba(0,0,0,0.4))',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <h1 style={{ fontSize: '65px', margin: 0, fontWeight: 800 }}>Take a Virtual Tour</h1> */}
          <h2 style={{ fontSize: '50px', margin: 0, fontWeight: 800 }}>{removeWordBeforeDash(communityName)}</h2>
        </div>

        <div tw="absolute left-0 top-10"
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 30,
            left: 40,
          }}
        >
          <svg width="169" height="69" viewBox="0 0 169 69" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M73.7026 56.8339V23.2513H63.3323V16.8034H91.273V23.2513H81.0639V56.8339H73.7026ZM103.507 57.4786C100.641 57.4786 98.026 56.816 95.6618 55.4906C93.3334 54.1652 91.4707 52.3562 90.0737 50.0636C88.7124 47.771 88.0318 45.1561 88.0318 42.2187C88.0318 39.2814 88.7124 36.6664 90.0737 34.3738C91.4707 32.0813 93.3334 30.2723 95.6618 28.9469C97.9902 27.6215 100.605 26.9588 103.507 26.9588C106.372 26.9588 108.969 27.6215 111.298 28.9469C113.626 30.2723 115.471 32.0813 116.832 34.3738C118.229 36.6664 118.928 39.2814 118.928 42.2187C118.928 45.1561 118.229 47.789 116.832 50.1173C115.435 52.4099 113.573 54.2189 111.244 55.5443C108.916 56.8339 106.337 57.4786 103.507 57.4786ZM103.507 51.0308C105.083 51.0308 106.462 50.6547 107.644 49.9024C108.862 49.1502 109.811 48.1113 110.492 46.786C111.208 45.4247 111.567 43.9023 111.567 42.2187C111.567 40.5351 111.208 39.0306 110.492 37.7052C109.811 36.3798 108.862 35.341 107.644 34.5888C106.462 33.8007 105.083 33.4066 103.507 33.4066C101.931 33.4066 100.516 33.8007 99.2619 34.5888C98.0439 35.341 97.0768 36.3798 96.3603 37.7052C95.6797 39.0306 95.3394 40.5351 95.3394 42.2187C95.3394 43.9023 95.6797 45.4247 96.3603 46.786C97.0768 48.1113 98.0439 49.1502 99.2619 49.9024C100.516 50.6547 101.931 51.0308 103.507 51.0308ZM132.541 57.4786C129.102 57.4786 126.397 56.3861 124.427 54.201C122.493 51.9801 121.525 49.0785 121.525 45.4964V27.6036H128.564V44.9053C128.564 46.768 129.102 48.2546 130.176 49.3651C131.287 50.4756 132.72 51.0308 134.475 51.0308C136.194 51.0308 137.609 50.4756 138.72 49.3651C139.83 48.2188 140.385 46.6785 140.385 44.7441V27.6036H147.424V56.8339H140.762V53.3413C139.938 54.7025 138.809 55.7413 137.376 56.4577C135.979 57.1383 134.367 57.4786 132.541 57.4786ZM151.818 56.8339V27.6036H158.427V31.7409C159.18 30.0573 160.236 28.8931 161.597 28.2484C162.959 27.6036 164.535 27.2812 166.326 27.2812H168.045V33.5141H165.52C163.55 33.5141 161.938 34.141 160.684 35.3947C159.466 36.6127 158.857 38.3321 158.857 40.553V56.8339H151.818Z" fill="white" />
            <path d="M49.4766 27.4808C53.4961 29.7778 53.5427 35.5573 49.5607 37.9188L24.0385 53.0549C20.0313 55.4314 14.9562 52.5677 14.9187 47.909L14.6781 18.0499C14.6406 13.3912 19.6689 10.4462 23.7138 12.7578L49.4766 27.4808Z" fill="#1674FF" />
          </svg>
        </div>

        <div
           style={{
            display: 'flex',
           }}
        tw="flex flex-row gap-9 pl-6 pr-14 w-full absolute bottom-16 cursor-pointer flex items-center text-white z-20 group">
          <div 
            style={{
              display: 'flex'
             }}
            //  bg-sky-500/80
          tw="w-fit h-fit cursor-pointer group-hover/introScreen:scale-125 bg-white/20 group-hover/introScreen:bg-sky-500/80 transition p-9 backdrop-blur-md hover:backdrop-blur-sm font-medium z-20 rounded-full flex-row items-center text-white   duration-250">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" tw="w-7 h-7 group-hover/introScree:scale-125">
            <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd"></path></svg>
          </div>
          <div tw="flex flex-col w-full gap-1 ml-4"
            style={{
              display: 'flex',
             }}
          >
            <span tw="text-2xl md:text-4xl  font-bold hover:text-white/80 w-full"> Start Virtual Tour</span>
            <span tw="text-base text-neutral-300">Press play to get started</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Plus Jakarta Sans',
          data: fontMedium,
          style: 'normal',
        },
      ],
    },
  );
}

