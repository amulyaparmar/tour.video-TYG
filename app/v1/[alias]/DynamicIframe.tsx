"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DynamicIframe({ alias='@vue32', initialSearchParams }) {
  const searchParams = useSearchParams();
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    const baseUrl = "https://embed.tour.video";
    console.log("aliasTYG: ", alias);
    const queryString = new URLSearchParams({
      uuid: alias,
      inline: "true",
      ...Object.fromEntries(searchParams.entries()),
    }).toString();
    setIframeSrc(`${baseUrl}?${queryString}`);
  }, [alias, searchParams]);

  
  const fullScreenStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none",
  };

  return (
    <iframe
      src={iframeSrc}
      style={fullScreenStyle}
      allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *; clipboard-write"
      allowFullScreen
    />
  );
}