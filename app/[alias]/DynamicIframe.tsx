"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DynamicIframe({ alias, initialSearchParams }) {
  const searchParams = useSearchParams();
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    const baseUrl = "https://embed.tour.video";
    const queryString = new URLSearchParams({
      uuid: alias,
      ...Object.fromEntries(searchParams.entries()),
    }).toString();
    setIframeSrc(`${baseUrl}?${queryString}`);
  }, [alias, searchParams]);

  if (!iframeSrc) {
    return <div>Loading...</div>;
  }

  return (
    <iframe
      src={iframeSrc}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
      allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *; clipboard-write"
      allowFullScreen
    />
  );
}
