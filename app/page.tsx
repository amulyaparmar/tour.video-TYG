"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const { alias = '', ...urlParams } = router?.query || {};

  // Construct the iframe src URL
  const baseUrl = "https://embed.tour.video";
  const queryString = new URLSearchParams({
    uuid: alias,
    ...urlParams,
  }).toString();
  const iframeSrc = `${baseUrl}?${queryString}`;

  return (
    <>
      <Head>
        <title>{`Video Tour for ${alias}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
    </>
  );
}

// This ensures that the page is rendered on the server side
// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
