import React from 'react';

export async function generateMetadata({ params, searchParams }) {
  // The base64 encoded string
  const v = params?.v.replaceAll("%3D", "") || "";

  // Decode the base64 string
  const decodedString = atob(v);

  // Parse the JSON string
  const jsonObject = JSON.parse(decodedString);

  console.log(jsonObject);

  // Extract the URL from the JSON object
  const url = jsonObject.url;

  // Extract the date part from the URL using a regular expression
  const dateMatch = url.match(/\/(\d{8})\//);
  let formattedDate = "";
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
    title: `Download Tour.video Recording ${formattedDate ? `- ${formattedDate}` : ""}`,
    description: `Take a virtual tour of our sample work`,
    openGraph: {
      title: `Download Tour.video Recording ${formattedDate ? `- ${formattedDate}` : ""}`,
      description: `Explore our recording virtually!`,
      images: [
        {
          url: "https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/1bd9561c-0fe2-4dab-52d1-a559785d4c00/original",
          width: 400,
          height: 208,
        },
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
    twitter: {
      card: 'player',
      title: `Download Tour.video Recording ${formattedDate ? `- ${formattedDate}` : ""}`,
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
  const v = params?.v.replaceAll("%3D", "") || "";

  // Decode the base64 string
  const decodedString = atob(v);

  // Parse the JSON string
  const jsonObject = JSON.parse(decodedString);

  console.log(jsonObject);

  // Extract the URL from the JSON object
  const url = jsonObject.url;

  // Extract the date part from the URL using a regular expression
  const dateMatch = url.match(/\/(\d{8})\//);
  let formattedDate = "";
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

  return (
    <>
      <div className="relative w-full h-screen">
        <span>
          <video controls src={jsonObject?.url} className='h-[50vh] w-[50vw] mb-5' />
          <a href={jsonObject?.url} target='_blank'>{jsonObject?.url?.substring(0,50)}...</a>
          <a href={jsonObject?.url} download className='rounded bg-sky-500 p-2 text-white'>Download Video</a>
        </span>
      </div>
      <div id="tour-widget-container" className="w-full h-96 mt-4">
        {/* The Tour widget will be inserted here */}
      </div>
    </>
  );
}
